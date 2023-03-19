import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface IRequest {
	email: string
	password: string
}

interface IResponse {
	user: User
}

export class AuthenticateUseCase {
	constructor(private userRepository: IUsersRepository) {}

	async execute({ email, password }: IRequest): Promise<IResponse> {
		const user = await this.userRepository.findByEmail(email)
		if (!user) {
			throw new InvalidCredentialsError()
		}

		const doesPasswordsMatch = await compare(password, user.password_hash)
		if (!doesPasswordsMatch) {
			throw new InvalidCredentialsError()
		}

		return {
			user,
		}
	}
}
