"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { generateText } from "ai"
import { getOpenAIClient } from "@/utils/openai"

export function AIStudyPlanGenerator() {
  const [topic, setTopic] = useState("")
  const [studyPlan, setStudyPlan] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const generatePlan = async (topic: string) => {
    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "user", 
        content: `Generate a study plan for: ${topic}` 
      }],
      model: "gpt-4",
    });

    return completion.choices[0].message.content || '';
  }

  const generateStudyPlan = async () => {
    if (!topic.trim()) return

    setIsLoading(true)
    try {
      const text = await generatePlan(topic)
      setStudyPlan(text)
    } catch (error) {
      console.error("Error generating study plan:", error)
      toast({
        title: "Error",
        description: "Failed to generate study plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Study Plan Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter a topic you want to study..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mb-4"
        />
        <Button onClick={generateStudyPlan} disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Study Plan"}
        </Button>
        {studyPlan && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Your Study Plan:</h3>
            <p className="whitespace-pre-wrap">{studyPlan}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

