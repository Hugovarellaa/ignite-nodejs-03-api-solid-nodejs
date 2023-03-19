import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User check-in History User Case', () => {
	beforeEach(async () => {
		inMemoryCheckInRepository = new InMemoryCheckInRepository()
		sut = new FetchUserCheckInsHistoryUseCase(inMemoryCheckInRepository)
	})

	it('should be able to check-in history', async () => {
		inMemoryCheckInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		inMemoryCheckInRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		})

		const { checkIn } = await sut.execute({
			userId: 'user-01',
			page: 1,
		})

		expect(checkIn).toHaveLength(2)
		expect(checkIn).toEqual([
			expect.objectContaining({ gym_id: 'gym-01' }),
			expect.objectContaining({ gym_id: 'gym-02' }),
		])
	})

	it('should be able to fetch paginated check-in history', async () => {
		for (let i = 1; i <= 22; i++) {
			inMemoryCheckInRepository.create({
				gym_id: `gym-${i}`,
				user_id: 'user-01',
			})
		}

		const { checkIn } = await sut.execute({
			userId: 'user-01',
			page: 2,
		})

		expect(checkIn).toHaveLength(2)
		expect(checkIn).toEqual([
			expect.objectContaining({ gym_id: 'gym-21' }),
			expect.objectContaining({ gym_id: 'gym-22' }),
		])
	})
})