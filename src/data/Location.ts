import { z } from "zod"
import { v4 as uuid } from "uuid"

import getEmbedding from "@/ai/getEmbedding"
import vdb from "@/db/vdb"

const postSchema = z.object({
	id: z.string().uuid(),
	ip: z.string().ip(),
	content: z.string(),
	postedAt: z.coerce.date(),
})

export type Post = Awaited<ReturnType<ReturnType<typeof Location>["similarPosts"]>>[0]

const Location = ({ ip }: { ip: string }) => ({
	createPost: async ({ content }: { content: string }) => {
		const postedAtValue = new Date().valueOf()

		const id = uuid()

		const message = { ip, content, postedAt: postedAtValue }

		const vector = await getEmbedding(content)

		await vdb.insertPoints([{ id, payload: message, vector }])
	},
	similarPosts: async ({ content }: { content: string }) => {
		const embedding = await getEmbedding(content)

		const points = await vdb.searchPoints({ embedding, limit: 1000 })

		return points
			.map((point) => postSchema.parse({ id: point.id, ...point.payload }))
			.filter((post) => post.ip !== ip)
			.map(({ ip: _, ...post }) => post)
	},
})

export default Location
