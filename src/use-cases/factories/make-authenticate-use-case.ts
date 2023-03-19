import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
	const usersPrismaRepository = new PrismaUsersRepository()
	const authenticateUseCase = new AuthenticateUseCase(usersPrismaRepository)

	return authenticateUseCase
}
