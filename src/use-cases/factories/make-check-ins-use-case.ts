import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
	const prismaCheckInsRepository = new PrismaCheckInsRepository()
	const prismaGymsRepository = new PrismaGymsRepository()
	const useCase = new CheckInUseCase(
		prismaCheckInsRepository,
		prismaGymsRepository,
	)

	return useCase
}
