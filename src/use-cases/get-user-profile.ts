import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IRequest {
	userId: string
}

interface IResponse {
	user: User
}

export class GetUserProfileUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute({ userId }: IRequest): Promise<IResponse> {
		const user = await this.userRepository.findById(userId)
		if (!user) {
			throw new ResourceNotFoundError()
		}

		return {
			user,
		}
	}
}
