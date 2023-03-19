import { ICheckInRepository } from '@/repositories/check-in-repository'
import { IGymsRepository } from '@/repositories/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
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

	async execute({
		userId,
		gymId,
		userLatitude,
		userLongitude,
	}: IRequest): Promise<IResponse> {
		const gym = await this.gymsRepository.findById(gymId)
		if (!gym) {
			throw new ResourceNotFoundError()
		}

		// calculate distance between the gyms and the user
		const distance = getDistanceBetweenCoordinates(
			{
				latitude: userLatitude,
				longitude: userLongitude,
			},
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		)

		const MAX_DISTANCE_IN_KILOMETERS = 0.1

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new Error()
		}

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
