import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
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
})
