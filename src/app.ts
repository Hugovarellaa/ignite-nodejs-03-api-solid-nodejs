import fastify from 'fastify'

export const app = fastify()

app.get('/', (req, res) => {
	return 'Ola mundo'
})
