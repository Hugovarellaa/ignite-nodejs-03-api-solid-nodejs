import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearByGymsUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGyms() {
	const prismaGymsRepository = new PrismaGymsRepository()
	const useCase = new FetchNearByGymsUseCase(prismaGymsRepository)

	return useCase
}
