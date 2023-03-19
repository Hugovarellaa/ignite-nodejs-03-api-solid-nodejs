import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
	const usersPrismaRepository = new PrismaUsersRepository()
	const registerUseCase = new RegisterUseCase(usersPrismaRepository)

	return registerUseCase
}
