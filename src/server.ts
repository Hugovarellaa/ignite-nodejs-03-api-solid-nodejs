import { app } from './app'
import { env } from './env'

const PORT = env.PORT

app
	.listen({
		host: '0.0.0.0',
		port: PORT,
	})
	.then(() => console.log(`🚀🚀 Server listening on port ${PORT} 🚀🚀`))
