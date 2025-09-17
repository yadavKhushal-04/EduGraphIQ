"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Upload } from "lucide-react"
import { getOpenAIClient } from "@/utils/openai"

export function ImageProblemSolver() {
  const [image, setImage] = useState<File | null>(null)
  const [solution, setSolution] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const analyzeImage = async () => {
    if (!image) return

    setIsLoading(true)
    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = async () => {
        const base64Image = reader.result as string
        const openai = getOpenAIClient();
        
        const completion = await openai.chat.completions.create({
          messages: [{ 
            role: "user", 
            content: `Analyze this image of a math problem and provide a step-by-step solution:
            
            ${base64Image}
            
            Please provide a detailed explanation and solution to the problem shown in the image.`
          }],
          model: "gpt-4",
        });

        setSolution(completion.choices[0].message?.content || '');
      }
    } catch (error) {
      console.error("Error analyzing image:", error)
      toast({
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Problem Solver</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
            <label htmlFor="image-upload">
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
            </label>
            {image && <p className="mt-2">Image uploaded: {image.name}</p>}
          </div>
          <Button onClick={analyzeImage} disabled={!image || isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Analyze Image"}
          </Button>
          {solution && (
            <div>
              <h3 className="font-semibold mb-2">Solution:</h3>
              <Textarea value={solution} readOnly className="w-full h-40" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

