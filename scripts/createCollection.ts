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

const main = async () => {
	console.info(
		await (
			await fetch(`${QDRANT_URL}/collections/nearme`, {
				method: "PUT",
				body: JSON.stringify({
					name: "nearme",
					vectors: {
						size: 1536,
						distance: "Dot",
					},
				}),
				headers: {
					"Content-Type": "application/json",
					"api-key": QDRANT_API_KEY,
				},
			})
		).json(),
	)
}

main()
