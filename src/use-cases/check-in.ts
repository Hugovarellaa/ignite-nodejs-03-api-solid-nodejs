import { ICheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface IRequest {
	userId: string
	gymId: string
}

interface IResponse {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(private checkInRepository: ICheckInRepository) {}

	async execute({ userId, gymId }: IRequest): Promise<IResponse> {
		const checkIn = await this.checkInRepository.create({
			user_id: userId,
			gym_id: gymId,
		})

		return {
			checkIn,
		}
	}
}
