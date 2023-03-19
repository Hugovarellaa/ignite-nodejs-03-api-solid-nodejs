import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface IRegisterUseCaseRequest {
	name: string
	email: string
	password: string
}

// eslint-disable-next-line prettier/prettier
export async function registerUseCase({ name, email, password }: IRegisterUseCaseRequest) {
	const password_hash = await hash(password, 6)

	const userWithSameEmail = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	if (userWithSameEmail) {
		throw new Error(`'Email already exists'`)
	}

	const prismaUsersRepository = new PrismaUsersRepository()

	await prismaUsersRepository.create({ name, email, password_hash })
}
