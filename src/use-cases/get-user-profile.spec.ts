import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get Profile UseCase', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		sut = new GetUserProfileUseCase(inMemoryUsersRepository)
	})

	it('should be able to user profile', async () => {
		const createdUser = await inMemoryUsersRepository.create({
			name: 'John Doe',
			email: 'john@example.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			userId: createdUser.id,
		})

		expect(user).toHaveProperty('id')
		expect(user).toHaveProperty('name')
		expect(user).toHaveProperty('email')
		expect(user).toHaveProperty('password_hash')
		expect(user).toHaveProperty('created_at')
	})
})
