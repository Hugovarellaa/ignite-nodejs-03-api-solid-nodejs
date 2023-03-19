import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gyms'

let inMemoryGymRepository: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Fetch User check-in History User Case', () => {
	beforeEach(async () => {
		inMemoryGymRepository = new InMemoryGymRepository()
		sut = new SearchGymUseCase(inMemoryGymRepository)
	})

	it('should be able to check-in history', async () => {
		await inMemoryGymRepository.create({
			title: 'Javascript Gym',
			description: '',
			phone: '',
			latitude: -15.4600052,
			longitude: -47.6093762,
		})

		await inMemoryGymRepository.create({
			title: 'Typescript Gym',
			description: '',
			phone: '',
			latitude: -15.4600052,
			longitude: -47.6093762,
		})

		const { gyms } = await sut.execute({
			query: 'Javascript',
			page: 1,
		})

		expect(gyms).toHaveLength(1)
		expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
	})

	it('should be able to fetch paginated gyms search', async () => {
		for (let i = 1; i <= 22; i++) {
			await inMemoryGymRepository.create({
				title: `Javascript Gym ${i}`,
				description: '',
				phone: '',
				latitude: -15.4600052,
				longitude: -47.6093762,
			})
		}

		const { gyms } = await sut.execute({
			query: 'Javascript',
			page: 2,
		})

		expect(gyms).toHaveLength(2)
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript Gym 21' }),
			expect.objectContaining({ title: 'Javascript Gym 22' }),
		])
	})
})
