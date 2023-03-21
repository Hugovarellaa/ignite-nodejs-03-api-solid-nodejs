import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyInstance } from 'fastify'
import { profile } from './profile'

export async function usersRoutes(app: FastifyInstance) {
	app.post('/users', makeRegisterUseCase)
	app.post('/sessions', makeAuthenticateUseCase)

	// Authenticated
	app.get('/me', { onRequest: [verifyJWT] }, profile)
}
