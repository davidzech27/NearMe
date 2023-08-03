"use client"
import { type Post } from "@/data/Location"
import formatDate from "@/utils/formatDate"

export default function PostDisplay({ content, postedAt }: Post) {
	return (
		<div className="group relative cursor-pointer overflow-hidden rounded-lg border-[1.5px] border-[#434E60] bg-[#060D19] px-5 pb-6 pt-4 shadow-none transition duration-[400ms] hover:border-[#B2B9C9] hover:shadow-lg hover:shadow-[rgba(122,130,149,0.2)]">
			<div
				className="relative z-10 overflow-hidden overflow-ellipsis text-xl font-light leading-normal text-white opacity-80 transition-opacity duration-[400ms] group-hover:opacity-100"
				style={{
					WebkitLineClamp: 15,
					WebkitBoxOrient: "vertical",
					display: "-webkit-box",
				}}
			>
				{content}
			</div>

			<div className="relative z-10 mt-4 text-sm leading-none text-[#9F9F9F] opacity-70 transition-opacity duration-[400ms] group-hover:opacity-100">
				{formatDate(postedAt)}
			</div>

			<div
				className="absolute left-0 top-0 h-full w-full origin-bottom-left group-hover:rotate-[-98deg]"
				style={{
					transitionProperty: "transform",
					transitionTimingFunction: "cubic-bezier(0.8, 0.1, 0, 1)",
					transitionDuration: "400ms",
				}}
			>
				<div
					className="absolute bottom-[-3%] right-[-8%] h-[130%] w-[136%] bg-[#03080C]"
					style={{
						borderRadius: "100% 50%",
					}}
				></div>

				<div className="absolute -z-10 h-full w-full origin-bottom-left rotate-[98deg] bg-[#03080C]">
					<div
						className="absolute bottom-[-3%] right-[-8%] h-[130%] w-[136%] bg-[#060D19]"
						style={{
							borderRadius: "100% 50%",
						}}
					></div>
				</div>
			</div>
		</div>
	)
}
