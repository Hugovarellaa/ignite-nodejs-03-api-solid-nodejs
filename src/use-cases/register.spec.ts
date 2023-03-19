import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register User Case', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository()
		sut = new RegisterUseCase(inMemoryUsersRepository)
	})

	it('should be able to register', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'john@example.com',
			password: '123123',
		})

		expect(user).toHaveProperty('id')
		expect(user).toHaveProperty('name')
		expect(user).toHaveProperty('email')
		expect(user).toHaveProperty('password_hash')
	})

	it('should hash user password upon registration', async () => {
		const { user } = await sut.execute({
			name: 'John Doe',
			email: 'john@example.com',
			password: '123123',
		})

		const isPasswordCorrectlyHashed = await compare(
			'123123',
			user.password_hash,
		)

		expect(isPasswordCorrectlyHashed).toBe(true)
	})

	it('should not be able to register with same email twice', async () => {
		expect(async () => {
			const email = 'john@example.com'

			await sut.execute({
				name: 'John Doe',
				email,
				password: '123123',
			})

			await sut.execute({
				name: 'John Doe',
				email,
				password: '123123',
			})
		}).rejects.toBeInstanceOf(UserAlreadyExistsError)
	})
})
