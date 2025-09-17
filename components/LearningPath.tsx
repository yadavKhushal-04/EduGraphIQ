"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle } from "lucide-react"

export function LearningPath() {
  const [path, setPath] = useState([
    { id: 1, title: "Introduction to Linear Equations", completed: false },
    { id: 2, title: "Understanding Slope", completed: false },
    { id: 3, title: "Y-Intercept and X-Intercept", completed: false },
    { id: 4, title: "Graphing Linear Equations", completed: false },
    { id: 5, title: "Solving Real-World Problems", completed: false },
  ])

  useEffect(() => {
    const progress = Number.parseInt(localStorage.getItem("userProgress") || "0")
    const updatedPath = path.map((step, index) => ({
      ...step,
      completed: index < progress / 20, // Assuming each step represents 20% progress
    }))
    setPath(updatedPath)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Path</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {path.map((step) => (
            <li key={step.id} className="flex items-center">
              {step.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 mr-2" />
              )}
              <span className={step.completed ? "text-gray-700" : "text-gray-500"}>{step.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

