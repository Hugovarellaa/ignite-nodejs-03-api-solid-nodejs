import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let sut: FetchNearByGymsUseCase

describe('Fetch User check-in History User Case', () => {
	beforeEach(async () => {
		inMemoryGymRepository = new InMemoryGymRepository()
		sut = new FetchNearByGymsUseCase(inMemoryGymRepository)
	})

	it('should be able to fetch nearby gyms', async () => {
		await inMemoryGymRepository.create({
			title: 'Near Gym',
			description: 'Javascript Gym',
			phone: '',
			latitude: -15.455973,
			longitude: -47.6382589,
		})

		await inMemoryGymRepository.create({
			title: 'Far Gym',
			description: 'Javascript Gym',
			phone: '',
			latitude: -15.7632055,
			longitude: -47.9047106,
		})

		const { gyms } = await sut.execute({
			userLatitude: -15.4600052,
			userLongitude: -47.6093762,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
	})
})
