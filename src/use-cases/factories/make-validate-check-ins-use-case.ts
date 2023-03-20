import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function makeValidateCheckInsUseCase() {
	const prismaCheckInsRepository = new PrismaCheckInsRepository()
	const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

	return useCase
}
