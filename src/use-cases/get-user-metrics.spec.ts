import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics User Case', () => {
	beforeEach(async () => {
		inMemoryCheckInRepository = new InMemoryCheckInRepository()
		sut = new GetUserMetricsUseCase(inMemoryCheckInRepository)
	})

	it('should be able to get check-ins count from metrics', async () => {
		inMemoryCheckInRepository.create({
			gym_id: 'gym-01',
			user_id: 'user-01',
		})

		inMemoryCheckInRepository.create({
			gym_id: 'gym-02',
			user_id: 'user-01',
		})

		const { checkInCount } = await sut.execute({
			userId: 'user-01',
		})

		expect(checkInCount).toEqual(2)
	})
})
