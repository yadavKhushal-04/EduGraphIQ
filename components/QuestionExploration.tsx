"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { generateText } from "ai"
import { getOpenAIClient } from "@/utils/openai"

export function QuestionExploration() {
  const [questions, setQuestions] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    generateQuestions()
  }, [])

  const generateQuestions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const openai = getOpenAIClient();
      const completion = await openai.chat.completions.create({
        messages: [{ 
          role: "user", 
          content: "Generate 3 questions with numerical answers about linear equations, separated by '|'."
        }],
        model: "gpt-4",
      });

      const generatedQuestions = (completion.choices[0].message?.content || '').split("|").map((q) => q.trim())
      if (generatedQuestions.length === 0) {
        throw new Error("No questions were generated. Please try again.")
      }
      setQuestions(generatedQuestions)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const openai = getOpenAIClient();
      let prompt = `You are an AI tutor. The question is: "${questions[currentQuestionIndex]}" The student's answer is: "${userAnswer}" Provide brief feedback on the answer, and if it's incorrect, give a hint without revealing the full answer.`

      if (image) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = async () => {
          const base64Image = reader.result as string
          prompt += `\n\nThe student has also provided an image related to their answer. Please analyze the image and incorporate it into your feedback:\n\n${base64Image}`

          await generateFeedback(prompt)
        }
      } else {
        await generateFeedback(prompt)
      }
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateFeedback = async (prompt: string) => {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    const feedback = completion.choices[0].message?.content || '';
    setFeedback(feedback)

    if (feedback.toLowerCase().includes("correct")) {
      handleCorrectAnswer()
    }
  }

  const getHint = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const openai = getOpenAIClient();
      const completion = await openai.chat.completions.create({
        messages: [{ 
          role: "user", 
          content: `You are an AI tutor. Provide a helpful hint for the following question without giving away the answer: "${questions[currentQuestionIndex]}"`
        }],
        model: "gpt-4",
      });

      toast({
        title: "Hint",
        description: completion.choices[0].message?.content || '',
      })
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleCorrectAnswer = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setUserAnswer("")
      setFeedback("")
      setImage(null)
    } else {
      toast({
        title: "Concept mastered!",
        description: "You've completed all questions for this concept.",
      })
    }
  }

  const handleError = (error: any) => {
    console.error("Error generating feedback:", error)
    setError(error instanceof Error ? error.message : "An unknown error occurred")
    toast({
      title: "Error",
      description: "Failed to generate feedback. Please try again.",
      variant: "destructive",
    })
  }

  if (isLoading && questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Question Exploration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Question Exploration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">{error}</div>
          <Button onClick={generateQuestions} className="mt-4">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Question Exploration</CardTitle>
        </CardHeader>
        <CardContent>
          <div>No questions available. Please try again.</div>
          <Button onClick={generateQuestions} className="mt-4">
            Generate Questions
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Question Exploration</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{questions[currentQuestionIndex]}</h3>
            <Textarea
              placeholder="Type your answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex items-center space-x-4">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload">
                <Button type="button" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </label>
              {image && <span>{image.name}</span>}
            </div>
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={getHint} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Hint"}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Answer"}
              </Button>
            </div>
          </div>
        </form>
        {feedback && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h4 className="font-semibold mb-2">Feedback:</h4>
            <p>{feedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

