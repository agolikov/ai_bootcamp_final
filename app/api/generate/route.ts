import OpenAI from 'openai';

const openai = new OpenAI();

export const runtime = 'edge';

export async function POST(req: Request) {
    const { topic, length, temperature } = await req.json();

    const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages: [
            {
                role: "system",
                content:
                    `You are a stoic phylosopher who has been hired to write a stoic quotes. 
                    The quoutes should be insightful, wise, and engaging to think. 
                    Write a Quote about ${topic}. The length of the quote must be around ${length} characters.`
            },
        ],
        temperature: temperature
    });

    return new Response(JSON.stringify({ quote: res.choices[0].message.content }));
}
