import { ICheckInRepository } from '@/repositories/check-in-repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error'
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

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.created_at,
			'minutes',
		)

		if (distanceInMinutesFromCheckInCreation > 20) {
			throw new LateCheckInValidationError()
		}

		checkIn.validated_at = new Date()

		await this.checkInRepository.save(checkIn)

		return {
			checkIn,
		}
	}
}
