import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate User Case', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		sut = new AuthenticateUseCase(inMemoryUsersRepository)
	})

	it('should be able to authenticate', async () => {
		await inMemoryUsersRepository.create({
			name: 'John Doe',
			email: 'john@example.com',
			password_hash: await hash('123456', 6),
		})

		const { user } = await sut.execute({
			email: 'john@example.com',
			password: '123456',
		})

		expect(user).toHaveProperty('id')
		expect(user).toHaveProperty('name')
		expect(user).toHaveProperty('email')
		expect(user).toHaveProperty('password_hash')
		expect(user).toHaveProperty('created_at')
	})

	it('should not be able to authenticate with wrong email', async () => {
		expect(async () => {
			const { user } = await sut.execute({
				email: 'john@example.com',
				password: '123456',
			})

			expect(user).toHaveProperty('id')
			expect(user).toHaveProperty('name')
			expect(user).toHaveProperty('email')
			expect(user).toHaveProperty('password_hash')
			expect(user).toHaveProperty('created_at')
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		expect(async () => {
			await inMemoryUsersRepository.create({
				name: 'John Doe',
				email: 'john@example.com',
				password_hash: await hash('123456', 6),
			})

			const { user } = await sut.execute({
				email: 'john@example.com',
				password: '321321',
			})

			expect(user).toHaveProperty('id')
			expect(user).toHaveProperty('name')
			expect(user).toHaveProperty('email')
			expect(user).toHaveProperty('password_hash')
			expect(user).toHaveProperty('created_at')
		}).rejects.toBeInstanceOf(InvalidCredentialsError)
	})
})