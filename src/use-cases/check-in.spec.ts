import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from './check-in'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: CheckInUseCase

describe('Check In User Case', () => {
	beforeEach(() => {
		inMemoryCheckInRepository = new InMemoryCheckInRepository()
		sut = new CheckInUseCase(inMemoryCheckInRepository)

		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it('should be able to check in', async () => {
		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
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
			})

			await sut.execute({
				gymId: 'gym-01',
				userId: 'user-01',
			})
		}).rejects.toBeInstanceOf(Error)
	})

	it('should  be able to check in twice but in different day', async () => {
		vi.setSystemTime(new Date(2023, 2, 20, 8, 0, 0))
		await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})

		vi.setSystemTime(new Date(2023, 2, 21, 8, 0, 0))

		const { checkIn } = await sut.execute({
			gymId: 'gym-01',
			userId: 'user-01',
		})

		console.log(checkIn)
	})
})
