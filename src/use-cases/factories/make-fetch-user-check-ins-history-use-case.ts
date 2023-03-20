import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistory() {
	const prismaCheckInsRepository = new PrismaCheckInsRepository()
	const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository)

	return useCase
}
