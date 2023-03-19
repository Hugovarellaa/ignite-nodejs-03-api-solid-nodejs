import { ICheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'

interface IRequest {
	userId: string
	page: number
}

interface IResponse {
	checkIn: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
	constructor(private checkInRepository: ICheckInRepository) {}

	async execute({ userId, page }: IRequest): Promise<IResponse> {
		const checkIn = await this.checkInRepository.findManyByUserId(userId, page)

		return {
			checkIn,
		}
	}
}
