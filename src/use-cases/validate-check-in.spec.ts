import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ValidateCheckInUseCase } from './validate-check-in'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInUseCase

describe('Validate Check In User Case', () => {
	beforeEach(async () => {
		inMemoryCheckInRepository = new InMemoryCheckInRepository()
		sut = new ValidateCheckInUseCase(inMemoryCheckInRepository)

		// vi.useFakeTimers()
	})

	afterEach(() => {
		// vi.useRealTimers()
	})

	it('should be able to validate the check-in', async () => {
		const createdCheckIn = await inMemoryCheckInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		const { checkIn } = await sut.execute({
			checkInId: createdCheckIn.id,
		})

		expect(checkIn.validated_at).toEqual(expect.any(Date))
		expect(inMemoryCheckInRepository.items[0].validated_at).toEqual(
			expect.any(Date),
		)
	})

	it('should not be able to validate an inexistent check-in', async () => {
		expect(async () => {
			await sut.execute({
				checkInId: 'inexistent-check-in-id',
			})
		}).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})
