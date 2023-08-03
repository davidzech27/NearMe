import { v4 as uuid } from "uuid"
import readline from "readline"
import { Faker, en } from "@faker-js/faker"

const { QDRANT_URL, QDRANT_API_KEY, OPENAI_SECRET_KEY } = process.env

if (typeof QDRANT_URL !== "string") {
	console.error("Must set QDRANT_URL environment variable")

	process.exit(1)
}

if (typeof QDRANT_API_KEY !== "string") {
	console.error("Must set QDRANT_API_KEY environment variable")

	process.exit(1)
}

if (typeof OPENAI_SECRET_KEY !== "string") {
	console.error("Must set OPENAI_SECRET_KEY environment variable")

	process.exit(1)
}

const createPost = async (post: { ip: string; content: string; postedAt: Date }) => {
	return await (
		await fetch(`${QDRANT_URL}/collections/nearme/points`, {
			method: "PUT",
			body: JSON.stringify({
				points: [
					{
						id: uuid(),
						payload: post,
						vector: (
							(await (
								await fetch("https://api.openai.com/v1/embeddings", {
									method: "POST",
									headers: {
										Authorization: `Bearer ${OPENAI_SECRET_KEY}`,
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										input: post.content,
										model: "text-embedding-ada-002",
									}),
								})
							).json()) as { data: [{ embedding: number[] }] }
						).data[0].embedding,
					},
				],
			}),
			headers: {
				"Content-Type": "application/json",
				"api-key": QDRANT_API_KEY,
			},
		})
	).json()
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

const faker = new Faker({ locale: en })

const main = async () => {
	const prompt = () =>
		rl.question("Content: ", async (answer) => {
			console.info(
				"Response:",
				await createPost({
					ip: faker.internet.ipv4(),
					content: answer,
					postedAt: new Date(
						new Date().valueOf() + (Math.random() * 2 - 1) * 1000 * 60 * 60 * 6,
					),
				}),
			)

			prompt()
		})

	prompt()
}

main()
