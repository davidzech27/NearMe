import { useState } from "react"

import { type Post } from "@/data/Location"
import createPostAction from "./createPostAction"
import cn from "@/utils/cn"
import LoadingSpinner from "@/components/LoadingSpinner"

interface Props {
	onPosts: (posts: Post[]) => void
}

export default function CreatePostForm({ onPosts }: Props) {
	const [text, setText] = useState("")

	const disabled = text === ""

	const [loading, setLoading] = useState(false)

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()

				setLoading(true)

				createPostAction({ content: text }).then(({ similarPosts }) => {
					onPosts(similarPosts)
				})
			}}
			className="flex h-full flex-col justify-between md:justify-start md:gap-2.5"
		>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Say what's on your mind"
				autoCorrect="false"
				className="rounded-lg border border-[#596375] bg-[#060D19] px-5 py-4 text-white outline-none transition-all placeholder:text-[#9F9F9F] placeholder:opacity-60 placeholder:transition-opacity hover:placeholder:opacity-100 focus:border-[#B2B9C9] focus:bg-opacity-60 focus:placeholder:opacity-100"
			/>

			<button
				disabled={disabled}
				className={cn(
					"group relative flex h-20 w-full items-center justify-center overflow-hidden rounded-lg border-[1.5px] border-[#596375] bg-[#03080C] text-lg transition duration-[400ms] hover:border-[#596375]/0",
					disabled && "pointer-events-none opacity-50",
				)}
			>
				<div className="relative z-50 align-middle text-xl font-semibold text-white transition-all duration-[400ms] group-hover:font-extralight">
					{!loading ? "Post" : <LoadingSpinner className="h-9 w-9 fill-white" />}
				</div>

				<div
					className="absolute left-0 top-0 h-full w-full origin-bottom-left rotate-[-98deg] group-hover:rotate-0"
					style={{
						transitionProperty: "transform",
						transitionTimingFunction: "cubic-bezier(0.8, 0.1, 0, 1)",
						transitionDuration: "400ms",
					}}
				>
					<div
						className="absolute bottom-[-3%] right-[-8%] h-[130%] w-[136%] bg-gradient-to-br from-[#1E5DFF] to-[#864AFF]"
						style={{
							borderRadius: "100% 50%",
						}}
					></div>

					<div className="absolute top-0 -z-10 h-full w-full origin-bottom-left rotate-[98deg] bg-[#121725] from-[#1E5DFF] to-[#864AFF]">
						<div
							className="absolute bottom-[-3%] right-[-8%] h-[130%] w-[136%] bg-[#03080C]"
							style={{
								borderRadius: "100% 50%",
							}}
						></div>
					</div>
				</div>
			</button>
		</form>
	)
}
