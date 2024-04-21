'use client';

import { useChat } from 'ai/react';
import { SetStateAction, useEffect, useRef } from "react";
import { useState } from 'react';

export default function Chat() {
  const { messages, input, append, handleInputChange, handleSubmit } = useChat();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [topic, setTopic] = useState("work");
  const [temperature, setTemperature] = useState(1);
  const [quote, setQuote] = useState<string | null>(null);
  const [length, setLength] = useState(30);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicChnge = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTopic(e.target.value);
  }

  const handleTemperatureChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTemperature(Number(e.target.value));
  }

  const handleLengthChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLength(Number(e.target.value));
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
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8">Just Stoic</h1>
        </div>
        <div className="space-x-2 gap-4 items-center">

          <div className="text-black gap-4 items-center">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic:</label>
            <select
              id="topic"
              name="topic"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={topic}
              onChange={handleTopicChnge}>
              <option value="work">Work</option>
              <option value="people">People</option>
              <option value="life">Life</option>
              <option value="health">Health</option>
              <option value="mindset">Mindset</option>
            </select>
          </div>

          <div className="flex gap-4 items-center">
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length:</label>
            <input
              type="range"
              id="length"
              name="length"
              min="10"
              max="100"
              step="10"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={length}
              onChange={handleLengthChange} />
            <span>{length}</span>
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
          <div className="flex flex-col items-center">
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
                    body: JSON.stringify({ topic, temperature }),
                  });
                  if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                  }
                  const data = await response.json();
                  setQuote(data.quote);
                } finally {
                  setIsLoading(false);
                }
              }}
            >Generate Quote
            </button>
          </div>
        </div>
        {
          quote &&
          !isLoading && <p className="mt-4 text-lg text-white-700">Quote: {quote}
          </p>
        }
      </div>
    </div>);
}