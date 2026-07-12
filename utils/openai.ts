import OpenAI from 'openai';

export async function askOpenAI(messages: any[], model = "gpt-4o") {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, model }),
  })
  if (!res.ok) throw new Error("AI request failed")
  return res.json()
}