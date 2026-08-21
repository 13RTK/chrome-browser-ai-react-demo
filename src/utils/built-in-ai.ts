import { browserAI } from '@browser-ai/core';
import { generateText } from 'ai';

const model = browserAI();

// Check if the model is available.
export async function isBrowserAIAvailable(): Promise<boolean> {
  const availability = await model.availability();

  // Check if the model is available.
  if (availability === 'unavailable') {
    console.log('Your browser cannot run the built-in AI model.');
    return false;
  }

  if (availability === 'downloadable' || availability === 'downloading') {
    await model.createSessionWithProgress((progress) => {
      console.log(`Download progress: ${Math.round(progress * 100)}%`);
    });
  }

  return true;
}

export async function generateResponse(
  prompt: string,
  { onSuccess }: { onSuccess: (response: string) => void },
) {
  const { text } = await generateText({
    model,
    prompt,
  });

  onSuccess(text);

  return text;
}
