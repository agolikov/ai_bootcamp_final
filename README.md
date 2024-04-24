
## Introduction

For the final project of the AI Bootcamp, I prepared the application called "Just Stoic". It is a web application designed to provide users with instant access to timeless wisdom from the Stoic philosophers. Rooted in the ancient philosophy of Stoicism, this app harnesses the power of technology to deliver inspirational quotes at the click of a button. By blending the principles of Stoic philosophy with modern web development, "Just Stoic" aims to offer users a daily dose of wisdom and perspective.

## Purpose

The purpose of "Just Stoic" is to serve as a demonstration of the learnings and skills acquired during a bootcamp. Developed as part of a bootcamp project, "Just Stoic" showcases the application of React, Next.js, TypeScript, Tailwind CSS, and integration with OpenAI's GPT-3.5 and DALL·E-2, DALL·E-3 models.

## Technologies

- **Front End**: The front end of "Just Stoic" is built using Next.js, a powerful React framework. Leveraging the benefits of TypeScript, developers can ensure type safety and improved code maintainability. Tailwind CSS is utilized for styling, offering a utility-first approach for rapid and responsive design.

- **Backend**: The backend is powered by models from OpenAI: GPT-3.5, DALL·E-2, DALL·E-3.
## Getting Started

First, clone this git repository by running:

```bash
git clone https://github.com/agolikov/ai_bootcamp_final
```

Then, navigate to the project directory and install npm dependencies:

```bash
npm install
```

Create .env file in the root directory and PUT your OpenAI key and Base URL. The example of content of the file:

```bash
OPENAI_API_KEY=sk-...<other_parts_of_key
OPENAI_BASE_URL=https://api.openai.com/v1
```

Now, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Workflow

1. First, you need to select one of the topics:
	- Work
	- People
	- Life
	- Health
	- Mindset

2. Then, define the desired length in the word count of the quote.
3. After, define a temperature: quotes may vary depending on temperature value. To get different quotes, better to have the temperature bigger.
4. Select parameters to generate an image for the quote:
	1. Pick a model: DALL-E 2 or DALL-E 3, I
	2. If you pick DALL-E 3 then select additional parameters: SD/HD, Vivid/Natural.
5. Click 'Generate' button

After some seconds passed you will see something like:

![Demo](/img/demo.jpg)

The quote is generated. ''Do not strive for success at work, but rather for excellence in all that you do. Success may be fleeting, but excellence is timeless.". Such a great quote!