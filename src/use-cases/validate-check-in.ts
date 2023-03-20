import { ICheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IRequest {
	checkInId: string
}

interface IResponse {
	checkIn: CheckIn
}

export class ValidateCheckInUseCase {
	constructor(private checkInRepository: ICheckInRepository) {}

	async execute({ checkInId }: IRequest): Promise<IResponse> {
		const checkIn = await this.checkInRepository.findById(checkInId)
		if (!checkIn) {
			throw new ResourceNotFoundError()
		}

		checkIn.validated_at = new Date()

		await this.checkInRepository.save(checkIn)

		return {
			checkIn,
		}
	}
}
