import { NextResponse } from "next/server"
import OpenAI from "openai"

export async function POST(req: Request) {
  const { messages, model = "gpt-4o" } = await req.json()
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const completion = await openai.chat.completions.create({ model, messages })
  return NextResponse.json(completion)
}