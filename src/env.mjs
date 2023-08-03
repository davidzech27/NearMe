import { z } from "zod"
import { createEnv } from "@t3-oss/env-nextjs"

const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),
		OPENAI_SECRET_KEY: z.string(),
		QDRANT_URL: z.string(),
		QDRANT_API_KEY: z.string(),
	},
	client: {},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		OPENAI_SECRET_KEY: process.env.OPENAI_SECRET_KEY,
		QDRANT_URL: process.env.QDRANT_URL,
		QDRANT_API_KEY: process.env.QDRANT_API_KEY,
	},
})

export default env
