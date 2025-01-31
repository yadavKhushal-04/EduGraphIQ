"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { getOpenAIClient } from "@/utils/openai"

export function PersonalizedLearningPath() {
  const [learningPath, setLearningPath] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    generateLearningPath()
  }, [])

  const generateLearningPath = async () => {
    setIsLoading(true)
    try {
      const openai = getOpenAIClient();
      const completion = await openai.chat.completions.create({
        messages: [{ 
          role: "user", 
          content: "Generate a personalized learning path for a student studying mathematics. Provide a list of 5 steps or topics to master, starting from basic concepts and progressing to more advanced ones."
        }],
        model: "gpt-4",
      });

      const steps = (completion.choices[0].message?.content || '').split("\n").filter((step) => step.trim() !== "")
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

