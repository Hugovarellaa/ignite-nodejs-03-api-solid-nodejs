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
		const gym = await prisma.gym.findMany({
			where: {
				title: {
					contains: query,
				},
			},
			take: 20,
			skip: (page - 1) * 20,
		})
		return gym
	}

	async findManyNearBy({
		latitude,
		longitude,
	}: IFindManyNearByParams): Promise<Gym[]> {
		const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

		return gyms
	}
}
