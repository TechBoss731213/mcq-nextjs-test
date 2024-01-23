import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY || '',
})

export const runtime = 'edge'

export async function POST(req: Request) {
	const { messages } = await req.json()

	const prompt = `
			When asked a question that means "What services do you provide?", please respond as follows:
			{
				"requestType": 4,
				"data": [
					{
						"id": 1,
						"content": "service01",
						"prompt": "I am interested in service01."
					},
					{
						"id": 2,
						"content": "service02",
						"prompt": "I am interested in service02."
					},
					{
						"id": 3,
						"content": "service03",
						"prompt": "I am interested in service03."
					}
				]
			}

			If you ask a question that means "What occupation can I choose?", give the following response.
			{
				"requestType": 4,
				"data": [
					{
						"id": 1,
						"content": "teacher",
						"prompt": "I like a teacher."
					},
					{
						"id": 2,
						"content": "doctor",
						"prompt": "I like a doctor."
					},
					{
						"id": 3,
						"content": "engineer",
						"prompt": "I like a engineer."
					}
				]
			}

			Only give me JSON data.
	`;

	const initialMessages = messages.slice(0, -1)
	const currentMessage = messages[messages.length - 1]

	const response = await openai.chat.completions.create({
		model: 'gpt-4',
		stream: true,
		messages: [
			...initialMessages,
			{
				role: 'system',
				content: prompt,
			},
			{
				...currentMessage,
				content: [{ type: 'text', text: currentMessage.content }],
			},
		],
	});

	const stream = OpenAIStream(response);

	return new StreamingTextResponse(stream);
}
