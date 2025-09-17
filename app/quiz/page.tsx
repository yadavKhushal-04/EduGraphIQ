"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, BookOpen, Brain, Trophy } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { fadeInUp, scaleIn, staggerChildren } from "@/utils/animations"

type Question = {
  question: string
  options: string[]
  correctAnswer: number
}

export default function QuizPage() {
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const generateQuiz = async () => {
    if (!topic) {
      toast({
        title: "Error",
        description: "Please enter a topic for the quiz.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const apiKey = localStorage.getItem("OPENAI_API_KEY")
      if (!apiKey) {
        throw new Error("OpenAI API key is not set. Please set your API key in the API Key Manager.")
      }
      const response = await generateText({
        model: openai("gpt-4o"),
        prompt: `Generate a ${difficulty} difficulty quiz with 5 multiple-choice questions about ${topic}. Ensure questions are clear, concise, and appropriate for the difficulty level. Format the response as a JSON array with each question object containing 'question', 'options' (array of 4 choices), and 'correctAnswer' (index of correct option).`,
        apiKey: apiKey,
      })

      if (!response || !response.text) {
        throw new Error("No response received from the API.")
      }

      const quizQuestions = JSON.parse(response.text)
      if (!Array.isArray(quizQuestions) || quizQuestions.length === 0) {
        throw new Error("Invalid quiz data received. Please try again.")
      }
      setQuestions(quizQuestions)
      setCurrentQuestionIndex(0)
      setScore(0)
      setQuizStarted(true)
      setQuizCompleted(false)
    } catch (error) {
      console.error("Error generating quiz:", error)
      setError(error instanceof Error ? error.message : "An unknown error occurred")
      toast({
        title: "Error",
        description: "Failed to generate quiz. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer.toString()) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer("")
    } else {
      setQuizCompleted(true)
      // Update user stats
      const currentProgress = Number.parseInt(localStorage.getItem("userProgress") || "0")
      localStorage.setItem("userProgress", (currentProgress + 5).toString())
      const currentMastered = Number.parseInt(localStorage.getItem("conceptsMastered") || "0")
      localStorage.setItem("conceptsMastered", (currentMastered + 1).toString())
      const quizzesCompleted = Number.parseInt(localStorage.getItem("quizzesCompleted") || "0")
      localStorage.setItem("quizzesCompleted", (quizzesCompleted + 1).toString())
      const totalQuizScore = Number.parseInt(localStorage.getItem("totalQuizScore") || "0")
      localStorage.setItem("totalQuizScore", (totalQuizScore + score).toString())
      localStorage.setItem("averageQuizScore", Math.round((totalQuizScore + score) / (quizzesCompleted + 1)).toString())
    }
  }

  const difficultyColors = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      <motion.div initial="initial" animate="animate" variants={staggerChildren} className="max-w-2xl mx-auto">
        <Card className="w-full overflow-hidden shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <CardTitle className="text-3xl font-bold">Quiz Master</CardTitle>
            <CardDescription className="text-purple-100">Challenge yourself and learn!</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {!quizStarted && (
                <motion.div key="setup" {...fadeInUp} className="space-y-4">
                  <div>
                    <Label htmlFor="topic" className="text-lg font-semibold">
                      Quiz Topic
                    </Label>
                    <Input
                      id="topic"
                      placeholder="Enter the quiz topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="difficulty" className="text-lg font-semibold">
                      Difficulty Level
                    </Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger id="difficulty" className="mt-1">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={generateQuiz}
                    disabled={isLoading || !topic}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <BookOpen className="mr-2 h-4 w-4" />
                    )}
                    Generate Quiz
                  </Button>
                </motion.div>
              )}

              {quizStarted && !quizCompleted && (
                <motion.div key="quiz" {...scaleIn} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${difficultyColors[difficulty as keyof typeof difficultyColors]}`}
                    >
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </span>
                  </div>
                  <p className="text-lg font-medium">{questions[currentQuestionIndex].question}</p>
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-2">
                    {questions[currentQuestionIndex].options.map((option: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    onClick={handleAnswerSubmit}
                    disabled={!selectedAnswer}
                    className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    <Brain className="mr-2 h-4 w-4" />
                    {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                  </Button>
                </motion.div>
              )}

              {quizCompleted && (
                <motion.div key="completed" {...fadeInUp} className="text-center space-y-4">
                  <Trophy className="mx-auto h-16 w-16 text-yellow-400" />
                  <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                  <p className="text-xl">
                    Your score: <span className="font-bold text-green-600">{score}</span> out of {questions.length}
                  </p>
                  <Button
                    onClick={() => {
                      setQuizStarted(false)
                      setTopic("")
                      setDifficulty("medium")
                    }}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Take Another Quiz
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

