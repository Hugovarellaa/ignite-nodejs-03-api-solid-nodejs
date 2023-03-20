import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { IFindManyNearByParams, IGymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements IGymsRepository {
	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym = await prisma.gym.create({
			data,
		})

		return gym
	}

	async findById(id: string): Promise<Gym | null> {
		const gym = await prisma.gym.findUnique({
			where: {
				id,
			},
		})
		return gym
	}

	async searchMany(query: string, page: number): Promise<Gym[]> {
		throw new Error('Method not implemented.')
	}

	async findManyNearBy(params: IFindManyNearByParams): Promise<Gym[]> {
		throw new Error('Method not implemented.')
	}
}
