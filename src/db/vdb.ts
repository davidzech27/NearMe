import { z } from "zod"

import env from "@/env.mjs"

const searchPointsResponseSchema = z.object({
	result: z
		.object({
			id: z.string().uuid(),
			score: z.number(),
			payload: z.record(z.string().or(z.number())),
		})
		.array(),
})

const vdb = {
	insertPoints: async (
		points: {
			id: string
			payload: Record<string, string | number>
			vector: number[]
		}[],
	) => {
		await (
			await fetch(`${env.QDRANT_URL}/collections/nearme/points`, {
				method: "PUT",
				body: JSON.stringify({ points }),
				headers: {
					"Content-Type": "application/json",
					"api-key": env.QDRANT_API_KEY,
				},
			})
		).json()
	},

	searchPoints: async ({
		embedding,
		limit,
		filter,
	}: {
		embedding: number[]
		limit: number
		filter?: Record<string, string | number>
	}) => {
		const json = await (
			await fetch(`${env.QDRANT_URL}/collections/nearme/points/search`, {
				method: "POST",
				body: JSON.stringify({
					vector: embedding,
					limit,
					filter:
						filter !== undefined
							? {
									must: Object.keys(filter).map((key) => ({
										key,
										match: { value: filter[key] },
									})),
							  }
							: undefined,
					with_payload: true,
				}),
				headers: {
					"Content-Type": "application/json",
					"api-key": env.QDRANT_API_KEY,
				},
			})
		).json()

		console.log(json)

		return searchPointsResponseSchema.parse(json).result
	},
}

export default vdb
