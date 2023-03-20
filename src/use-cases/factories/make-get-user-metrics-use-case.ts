import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
	const prismaCheckInsRepository = new PrismaCheckInsRepository()
	const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository)

	return useCase
}
