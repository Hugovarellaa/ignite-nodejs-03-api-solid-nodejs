import { ICheckInRepository } from '@/repositories/check-in-repository'

interface IRequest {
	userId: string
}

interface IResponse {
	checkInCount: number
}

export class GetUserMetricsUseCase {
	constructor(private checkInRepository: ICheckInRepository) {}

	async execute({ userId }: IRequest): Promise<IResponse> {
		const checkInCount = await this.checkInRepository.countByUserId(userId)

		return {
			checkInCount,
		}
	}
}
