"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { generateText } from "ai"
import { getOpenAIClient } from "@/utils/openai"

export function AIQandA() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [apiKeyError, setApiKeyError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    if (!apiKey || apiKey.length === 0) {
      setApiKeyError("OpenAI API key is missing. Please check your .env file.")
    } else {
      setApiKeyError(null)
    }
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      toast({
        title: "Image uploaded",
        description: `File "${file.name}" has been selected.`,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    if (apiKeyError) {
      toast({
        title: "Error",
        description: apiKeyError,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      let prompt = `You are an AI tutor for an educational platform. Answer the following question in a helpful and engaging manner: ${question}`

      if (image) {
        const reader = new FileReader()
        reader.onload = async (event) => {
          const base64Image = event.target?.result as string
          prompt += `\n\nThe user has also provided an image related to their question. Please analyze the image and incorporate it into your answer:\n\n${base64Image}`
          await generateAnswer(prompt)
        }
        reader.readAsDataURL(image)
      } else {
        await generateAnswer(prompt)
      }
    } catch (error) {
      console.error("Error generating answer:", error)
      let errorMessage = "Failed to generate an answer. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "object" && error !== null) {
        errorMessage = JSON.stringify(error)
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateAnswer = async (prompt: string) => {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    setAnswer(completion.choices[0].message.content || '');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask AI Tutor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Ask any question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex items-center space-x-4">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload-qa" />
            <label htmlFor="image-upload-qa">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                {image ? "Change Image" : "Upload Image"}
              </Button>
            </label>
            {image && <span className="text-sm text-muted-foreground">{image.name}</span>}
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Ask Question"
            )}
          </Button>
        </form>
        {apiKeyError && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            <p>{apiKeyError}</p>
            <Button
              onClick={() => {
                setApiKeyError(null)
              }}
              className="mt-2"
            >
              Set API Key
            </Button>
          </div>
        )}
        {answer && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Answer:</h3>
            <p className="text-sm">{answer}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

