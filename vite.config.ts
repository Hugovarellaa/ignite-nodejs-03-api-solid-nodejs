// Configuração para o vitest entende os import com @

import tsconfigPath from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPath()],
	test: {
		environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
	},
})
