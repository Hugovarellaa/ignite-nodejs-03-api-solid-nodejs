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
		const checkIn = await prisma.checkIn.findMany({
			where: {
				user_id: userId,
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return checkIn
	}

	async countByUserId(userId: string): Promise<number> {
		const count = await prisma.checkIn.count({
			where: {
				user_id: userId,
			},
		})
		return count
	}

	async findById(id: string): Promise<CheckIn | null> {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id,
			},
		})
		return checkIn
	}

	async save(data: CheckIn): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.update({
			where: {
				id: data.id,
			},
			data,
		})
		return checkIn
	}
}
