import { useEffect, useState } from 'react';
import { isBrowserAIAvailable } from '../utils/built-in-ai';
import { generateText } from 'ai';
import { browserAI } from '@browser-ai/core';

const model = browserAI();

export function useBrowserAI() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    async function checkAvailability() {
      const isAvailable = await isBrowserAIAvailable();

      if (!isAvailable) {
        alert('Your browser cannot run the built-in AI model.');
        setResult('Your browser cannot run the built-in AI model.');
        return;
      }
    }

    setIsLoading(true);

    checkAvailability();

    setResult('Type prompt to get response');
    setIsLoading(false);
  }, []);

  async function generateResponse(prompt: string) {
    setIsLoading(true);
    const startTime = Date.now();

    setResult('Waiting for response...');

    const { text } = await generateText({
      model,
      prompt,
    });

    setPrompt('');
    setIsLoading(false);

    setResult(text);

    const endTime = Date.now();
    setElapsedTime(endTime - startTime);

    return text;
  }

  return {
    prompt,
    setPrompt,
    isLoading,
    generateResponse,
    result,
    elapsedTime,
  };
}
