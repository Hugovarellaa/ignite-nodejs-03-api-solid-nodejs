import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
	const usersPrismaRepository = new PrismaUsersRepository()
	const useCase = new GetUserProfileUseCase(usersPrismaRepository)

	return useCase
}
