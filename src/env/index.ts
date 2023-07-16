import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
	console.error(
		`❌❌ Environment variable is missing ❌❌ ${_env.error.format()}`,
	)

	throw new Error('Environment variable is missing')
}

export const env = _env.data
