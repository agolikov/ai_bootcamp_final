import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: process.env.OPENAI_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { model, quality, style, topic } = await req.json();

    let prompt = 'Black and write picture. A Stoic philosopher named Marcus Aurelius Decimus, with weathered features and piercing eyes. '
    switch (topic) {
        case 'Work':
            prompt += 'The photo taken in a serene library.';
            break;
        case 'People':
            prompt += 'The photo taken in a serene library.';
            break;
        case 'Life':
            prompt += 'The photo taken in the bustling heart of a Roman marketplace';
            break;
        case 'Health':
            prompt += 'The photo taken in Deep in the heart of a serene forest, amidst towering trees and dappled sunlight, ';
            break;
        case 'Mindset':
            prompt += 'The photo taken in a quiet study room with shelves of old books and flickering candlelight';
            break;
    }
    const response = await openai.images.generate({ prompt, model, quality, style });
    return new Response(JSON.stringify({ url: response.data[0].url }))
} 