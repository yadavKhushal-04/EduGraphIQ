"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { askOpenAI } from "@/utils/openai"

export function PersonalizedLearningPath() {
  const [learningPath, setLearningPath] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [question, setQuestion] = useState("Create a personalized learning path for a beginner learning web development.")
  const { toast } = useToast()

  useEffect(() => {
    generateLearningPath()
  }, [])

  const generateLearningPath = async () => {
    setIsLoading(true)
    try {
      const result = await askOpenAI([
        { role: "system", content: "You are a helpful tutor..." },
        { role: "user", content: question },
      ]);
      // const answer = result.choices[0].message.content

      const steps = (result.choices[0].message?.content || "").split("\n").filter((step: string) => step.trim() !== "")
      setLearningPath(steps)
      setCurrentStep(Number.parseInt(localStorage.getItem("currentLearningStep") || "0"))
    } catch (error) {
      console.error("Error generating learning path:", error)
      toast({
        title: "Error",
        description: "Failed to generate learning path. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const completeStep = () => {
    if (currentStep < learningPath.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      localStorage.setItem("currentLearningStep", newStep.toString())
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Personalized Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalized Learning Path</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Ask anything about your learning path"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4"
        />
        <Button onClick={generateLearningPath} disabled={isLoading} className="mb-4">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Path"}
        </Button>
        <Progress value={(currentStep / (learningPath.length - 1)) * 100} className="mb-4" />
        <h3 className="font-semibold mb-2">
          Current Step: {currentStep + 1}/{learningPath.length}
        </h3>
        <p className="mb-4">{learningPath[currentStep]}</p>
        <Button onClick={completeStep} disabled={currentStep === learningPath.length - 1}>
          Complete Step
        </Button>
      </CardContent>
    </Card>
  )
}

