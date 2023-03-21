import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
	const getUserProfile = makeGetUserProfileUseCase()

	const { user } = await getUserProfile.execute({
		userId: request.user.sub,
	})

	const userReturn = {
		...user,
		password_hash: undefined,
	}

	return reply.status(200).send({
		user: userReturn,
	})
}
