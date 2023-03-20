import { prisma } from '@/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../check-in-repository'

export class PrismaCheckInsRepository implements ICheckInRepository {
	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.create({
			data,
		})

		return checkIn
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<CheckIn | null> {
		throw new Error('Method not implemented.')
	}

	async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
		throw new Error('Method not implemented.')
	}

	async countByUserId(userId: string): Promise<number> {
		throw new Error('Method not implemented.')
	}

	async findById(id: string): Promise<CheckIn | null> {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id,
			},
		})
		return checkIn
	}

	async save(checkIn: CheckIn): Promise<CheckIn> {
		throw new Error('Method not implemented.')
	}
}
