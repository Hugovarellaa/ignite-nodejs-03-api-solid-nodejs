import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IRequest {
	userLatitude: number
	userLongitude: number
}

interface IResponse {
	gyms: Gym[]
}

export class FetchNearByGymsUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute({ userLatitude, userLongitude }: IRequest): Promise<IResponse> {
		const gyms = await this.gymsRepository.findManyNearBy({
			latitude: userLatitude,
			longitude: userLongitude,
		})

		return {
			gyms,
		}
	}
}
