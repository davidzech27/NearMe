"use server"
import { headers } from "next/dist/client/components/headers"
import { z } from "zod"
import { zact } from "zact/server"

import Location from "@/data/Location"

const createPostAction = zact(
	z.object({
		content: z.string(),
	}),
)(async ({ content }) => {
	const ip = headers().get("X-Forwarded-For") ?? ""

	const location = Location({ ip })

	const [similarPosts] = await Promise.all([
		location.similarPosts({ content }),
		location.createPost({ content }),
	])

	return {
		similarPosts,
	}
})

export default createPostAction
