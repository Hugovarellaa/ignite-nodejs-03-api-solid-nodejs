import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxNumberOfCheckInError } from './errors/max-number-of-check-ins'

let inMemoryGymRepository: InMemoryGymRepository
let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check In User Case', () => {
	beforeEach(async () => {
		inMemoryGymRepository = new InMemoryGymRepository()
		inMemoryCheckInRepository = new InMemoryCheckInRepository()
		sut = new CheckInUseCase(inMemoryCheckInRepository, inMemoryGymRepository)

		await inMemoryGymRepository.create({
			id: 'gym-01',
			title: 'Javascript Gym',
			description: '',
			phone: '',
			latitude: new Decimal(-15.4600052),
			longitude: new Decimal(-47.6093762),
		})

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -15.4600052,
			userLongitude: -47.6093762,
		})

		expect(checkIn).toHaveProperty('id')
		expect(checkIn).toHaveProperty('user_id')
		expect(checkIn).toHaveProperty('gym_id')
		expect(checkIn).toHaveProperty('created_at')
	})

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2023, 2, 19, 8, 0, 0))

		expect(async () => {
			await sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: -15.4600052,
				userLongitude: -47.6093762,
			})

			await sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
				userLatitude: -15.4600052,
				userLongitude: -47.6093762,
			})
		}).rejects.toBeInstanceOf(MaxNumberOfCheckInError)
	})

	it('should  be able to check in twice but in different day', async () => {
		vi.setSystemTime(new Date(2023, 2, 20, 8, 0, 0))
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -15.4600052,
			userLongitude: -47.6093762,
		})

		vi.setSystemTime(new Date(2023, 2, 21, 8, 0, 0))

		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
			userLatitude: -15.4600052,
			userLongitude: -47.6093762,
		})
	})

	it('should not be able to check in on distant gym', async () => {
		expect(async () => {
			inMemoryGymRepository.items.push({
				id: 'gym-02',
				title: 'Javascript Gym',
				description: '',
				phone: '',
				latitude: new Decimal(-15.4461143),
				longitude: new Decimal(-47.608408),
			})

			await sut.execute({
				gymId: 'gym-02',
				userId: 'user-01',
				userLatitude: -15.4600052,
				userLongitude: -47.6093762,
			})
		}).rejects.toBeInstanceOf(MaxDistanceError)
	})
})
