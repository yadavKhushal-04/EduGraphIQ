import OpenAI from 'openai';

export function getOpenAIClient() {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing. Please check your .env file.");
  }

  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
  });
} 