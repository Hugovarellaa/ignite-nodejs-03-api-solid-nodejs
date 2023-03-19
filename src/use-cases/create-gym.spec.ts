import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { beforeEach, describe, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let inMemoryGymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Create Gym Case', () => {
	beforeEach(() => {
		inMemoryGymRepository = new InMemoryGymRepository()
		sut = new CreateGymUseCase(inMemoryGymRepository)
	})

	it('should be able to create gym', async () => {
		await sut.execute({
			id: 'gym-01',
			title: 'Javascript Gym',
			description: '',
			phone: '',
			latitude: -15.4600052,
			longitude: -47.6093762,
		})
	})
})
