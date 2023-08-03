"use client"
import { useState } from "react"

import { type Post } from "@/data/Location"
import CreatePostForm from "./CreatePostForm"
import PostDisplay from "./PostDisplay"

export default function Home() {
	const [posts, setPosts] = useState<Post[] | undefined>(undefined)

	return (
		<div className="flex min-h-screen bg-[#03080C] p-6">
			<div className="flex w-full flex-col gap-2.5">
				{posts === undefined ? (
					<CreatePostForm onPosts={setPosts} />
				) : (
					posts.map((post) => <PostDisplay {...post} />)
				)}
			</div>
		</div>
	)
}
