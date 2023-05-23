import 'dotenv/config'
import { z } from 'zod'

const evnSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	PORT: z.coerce.number().default(3333),
})

const _env = evnSchema.safeParse(process.env)

if (_env.success === false) {
	console.error('❌❌ Environment variable FAILED ❌❌', _env.error.format())
	throw new Error('Environment variable FAILED')
}

export const env = _env.data
