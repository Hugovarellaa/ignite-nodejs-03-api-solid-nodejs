import { ICheckInRepository } from '@/repositories/check-in-repository'
import { IGymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IRequest {
	userId: string
	gymId: string
	userLatitude: number
	userLongitude: number
}

interface IResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
		private checkInRepository: ICheckInRepository,
		private gymsRepository: IGymsRepository,
	) {}

	async execute({ userId, gymId }: IRequest): Promise<IResponse> {
		const gym = await this.gymsRepository.findById(gymId)
		if (!gym) {
			throw new ResourceNotFoundError()
		}

		// calculate distance between the gyms and the user

		const checkInOnSaveDate = await this.checkInRepository.findByUserIdOnDate(
			userId,
			new Date(),
		)

		if (checkInOnSaveDate) {
			throw new Error()
		}

		const checkIn = await this.checkInRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return {
			checkIn,
		}
	}
}
