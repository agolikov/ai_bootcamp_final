'use client';

import { useChat } from 'ai/react';
import { SetStateAction, useEffect, useRef } from "react";
import { useState } from 'react';

export default function Chat() {
  const { messages, input, append, handleInputChange, handleSubmit } = useChat();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [topic, setTopic] = useState("work");
  const [tone, setTone] = useState("witty");
  const [type, setType] = useState("run");
  const [temperature, setTemperature] = useState(1);
  const [joke, setJoke] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicChnge = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTopic(e.target.value);
  }

  const handleToneChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTone(e.target.value);
  }
  const handleTypeChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setType(e.target.value);
  }

  const handleTemperatureChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTemperature(Number(e.target.value));
  }

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-screen max-w-md py-24 mx-auto stretch">

      <div className="space-x-2 items-center">
        {/* Topic selector */}
        <div className="text-black flex-grow">
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
          <select
            id="topic"
            name="topic"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={topic}
            onChange={handleTopicChnge}
          >
            <option value="work">Work</option>
            <option value="people">People</option>
            <option value="animals">Animals</option>
            <option value="food">Food</option>
            <option value="television">Television</option>
          </select>
        </div>

        {/* Tone selector */}
        <div className="text-black flex-grow">
          <label htmlFor="tone" className="block text-sm font-medium text-gray-700">Tone:</label>
          <select
            id="tone"
            name="tone"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={tone}
            onChange={handleToneChange}
          >
            <option value="witty">Witty</option>
            <option value="sarcastic">Sarcastic</option>
            <option value="silly">Silly</option>
            <option value="dark">Dark</option>
            <option value="goofy">Goofy</option>
          </select>
        </div>

        {/* Type selector */}
        <div className="text-black flex-grow">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type of Joke:</label>
          <select
            id="type"
            name="type"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={type}
            onChange={handleTypeChange}>
            <option value="pun">Pun</option>
            <option value="knock-knock">Knock-Knock</option>
            <option value="story">Story</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature:</label>
          <input
            type="range"
            id="temperature"
            name="temperature"
            min="0"
            max="2"
            step="0.1"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={temperature}
            onChange={handleTemperatureChange} />
          <span>{temperature}</span>
        </div>

        <button
          className="bg-blue-500 p-2 text-white rounded shadow-xl"
          disabled={isLoading}
          onClick={async (e) => {
            e.preventDefault();
            try {
              setIsLoading(true);
              const response = await fetch("api/generate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, tone, type, temperature }),
              });
              if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
              }
              const data = await response.json();
              setJoke(data.joke);
              setEvaluation("");
            } finally {
              setIsLoading(false);
            }
          }}
        >Generate Joke
        </button>
        {joke && <button
          className="bg-blue-500 p-2 text-white rounded shadow-xl"
          disabled={isLoading && !joke}
          onClick={async (e) => {
            e.preventDefault();
            try {
              setIsLoading(true);
              const response = await fetch("api/evaluate", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, tone, type, joke }),
              });
              if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
              }
              const data = await response.json();
              setEvaluation(data.evaluation);
            } finally {
              setIsLoading(false);
            }
          }}
        >Evaluate Joke
        </button>
        }
      </div>
      {joke && !isLoading && <p className="mt-4 text-lg text-white-700">Joke: {joke}</p>}

      {evaluation && !isLoading && <pre className="mt-4 text-lg text-white-700">Evaluation: {evaluation}</pre>}

      {/* {<div className="fixed bottom-0 w-full max-w-md">
        <form onSubmit={handleSubmit} className="justify-center">
          <input
            className="w-[95%] p-2 mb-8 border border-gray-300 rounded shadow-xl text-black"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>}
      {<div className="overflow-auto mb-8 w-full" ref={messagesContainerRef}>
        {
          messages.map((m) => (
            <div
              key={m.id}
              className={`whitespace-pre-wrap ${m.role === "user"
                ? "bg-green-700 p-3 m-2 rounded-lg"
                : "bg-slate-700 p-3 m-2 rounded-lg"
                }`}
            >
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))
        }
        {
          isLoading && (
            <div className="flex justify-end pr-4">
              <span className="animate-spin">8</span>
            </div>
          )
        }
      </div>} */}
    </div>);
}