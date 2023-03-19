import { IGymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

interface IRequest {
	id: string
	title: string
	description: string | null
	phone: string | null
	latitude: number
	longitude: number
}

interface IResponse {
	gym: Gym
}

export class CreateGymUseCase {
	constructor(private gymsRepository: IGymsRepository) {}

	async execute(data: IRequest): Promise<IResponse> {
		const { description, phone, title, latitude, longitude, id } = data

		const gym = await this.gymsRepository.create({
			description,
			phone,
			title,
			latitude,
			longitude,
			id,
		})

		return {
			gym,
		}
	}
}
