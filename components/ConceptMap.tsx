"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { generateText } from "ai"
import { getOpenAIClient } from "@/utils/openai"

const conceptMap = {
  root: { title: "Mathematics", children: ["algebra", "geometry", "trigonometry", "calculus", "statistics"] },
  algebra: { title: "Algebra", children: ["linear-equations", "quadratic-equations", "polynomials", "functions"] },
  geometry: { title: "Geometry", children: ["euclidean-geometry", "analytic-geometry", "trigonometry"] },
  trigonometry: {
    title: "Trigonometry",
    children: ["trigonometric-functions", "trigonometric-identities", "trigonometric-equations"],
  },
  calculus: { title: "Calculus", children: ["limits", "derivatives", "integrals"] },
  statistics: { title: "Statistics", children: ["descriptive-statistics", "inferential-statistics", "probability"] },
  "linear-equations": { title: "Linear Equations", children: ["slope", "y-intercept", "graphing"] },
  "quadratic-equations": {
    title: "Quadratic Equations",
    children: ["quadratic-formula", "completing-the-square", "factoring"],
  },
  polynomials: {
    title: "Polynomials",
    children: ["polynomial-functions", "polynomial-division", "polynomial-roots", "factoring"],
  },
  functions: { title: "Functions", children: ["domain-and-range", "function-notation", "composition"] },
  "euclidean-geometry": { title: "Euclidean Geometry", children: ["triangles", "circles", "polygons"] },
  "analytic-geometry": { title: "Analytic Geometry", children: ["coordinate-system", "conic-sections", "vectors"] },
  "trigonometric-functions": { title: "Trigonometric Functions", children: ["sine", "cosine", "tangent"] },
  "trigonometric-identities": {
    title: "Trigonometric Identities",
    children: ["pythagorean-identities", "sum-difference-identities", "double-angle-identities"],
  },
  "trigonometric-equations": {
    title: "Trigonometric Equations",
    children: ["simple-equations", "complex-equations", "applications"],
  },
  limits: { title: "Limits", children: ["limit-definition", "limit-laws", "continuity"] },
  derivatives: { title: "Derivatives", children: ["derivative-rules", "implicit-differentiation", "applications"] },
  integrals: { title: "Integrals", children: ["indefinite-integrals", "definite-integrals", "applications"] },
  "descriptive-statistics": {
    title: "Descriptive Statistics",
    children: ["measures-of-central-tendency", "measures-of-dispersion", "data-visualization"],
  },
  "inferential-statistics": {
    title: "Inferential Statistics",
    children: ["hypothesis-testing", "confidence-intervals", "regression-analysis"],
  },
  probability: {
    title: "Probability",
    children: ["probability-rules", "probability-distributions", "conditional-probability"],
  },
  factoring: { title: "Factoring", children: ["common-factoring", "factoring-quadratics", "factoring-special-cases"] },
  "common-factoring": { title: "Common Factoring", children: [] },
  "factoring-quadratics": { title: "Factoring Quadratics", children: [] },
  "factoring-special-cases": { title: "Factoring Special Cases", children: [] },
  graphing: { title: "Graphing", children: ["coordinate-plane", "plotting-points", "graphing-linear-equations"] },
  "coordinate-plane": { title: "Coordinate Plane", children: [] },
  "plotting-points": { title: "Plotting Points", children: [] },
  "graphing-linear-equations": { title: "Graphing Linear Equations", children: [] },
  slope: { title: "Slope", children: [] },
  "y-intercept": { title: "Y-Intercept", children: [] },
  "quadratic-formula": { title: "Quadratic Formula", children: [] },
  "completing-the-square": { title: "Completing the Square", children: [] },
  "polynomial-functions": { title: "Polynomial Functions", children: [] },
  "polynomial-division": { title: "Polynomial Division", children: [] },
  "polynomial-roots": { title: "Polynomial Roots", children: [] },
  "domain-and-range": { title: "Domain and Range", children: [] },
  "function-notation": { title: "Function Notation", children: [] },
  composition: { title: "Function Composition", children: [] },
  triangles: { title: "Triangles", children: ["right-triangles", "similar-triangles", "congruent-triangles"] },
  circles: { title: "Circles", children: ["circle-properties", "circle-theorems"] },
  polygons: { title: "Polygons", children: ["regular-polygons", "irregular-polygons"] },
  "coordinate-system": { title: "Coordinate System", children: [] },
  "conic-sections": { title: "Conic Sections", children: ["parabolas", "ellipses", "hyperbolas"] },
  vectors: { title: "Vectors", children: ["vector-operations", "vector-applications"] },
  sine: { title: "Sine Function", children: [] },
  cosine: { title: "Cosine Function", children: [] },
  tangent: { title: "Tangent Function", children: [] },
  "pythagorean-identities": { title: "Pythagorean Identities", children: [] },
  "sum-difference-identities": { title: "Sum and Difference Identities", children: [] },
  "double-angle-identities": { title: "Double Angle Identities", children: [] },
  "simple-equations": { title: "Simple Trigonometric Equations", children: [] },
  "complex-equations": { title: "Complex Trigonometric Equations", children: [] },
  applications: { title: "Trigonometric Applications", children: [] },
  "limit-definition": { title: "Limit Definition", children: [] },
  "limit-laws": { title: "Limit Laws", children: [] },
  continuity: { title: "Continuity", children: [] },
  "derivative-rules": { title: "Derivative Rules", children: [] },
  "implicit-differentiation": { title: "Implicit Differentiation", children: [] },
  "indefinite-integrals": { title: "Indefinite Integrals", children: [] },
  "definite-integrals": { title: "Definite Integrals", children: [] },
  "measures-of-central-tendency": { title: "Measures of Central Tendency", children: [] },
  "measures-of-dispersion": { title: "Measures of Dispersion", children: [] },
  "data-visualization": { title: "Data Visualization", children: [] },
  "hypothesis-testing": { title: "Hypothesis Testing", children: [] },
  "confidence-intervals": { title: "Confidence Intervals", children: [] },
  "regression-analysis": { title: "Regression Analysis", children: [] },
  "probability-rules": { title: "Probability Rules", children: [] },
  "probability-distributions": { title: "Probability Distributions", children: [] },
  "conditional-probability": { title: "Conditional Probability", children: [] },
}

export function ConceptMap({ className }: { className?: string }) {
  const [expandedConcepts, setExpandedConcepts] = useState<string[]>(["root"])
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null)
  const [explanation, setExplanation] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const toggleConcept = (concept: string) => {
    setExpandedConcepts((prev) => (prev.includes(concept) ? prev.filter((c) => c !== concept) : [...prev, concept]))
  }

  const getExplanation = async (concept: string) => {
    setIsLoading(true)
    setSelectedConcept(concept)

    try {
      const openai = getOpenAIClient()
      const completion = await openai.chat.completions.create({
        messages: [{ 
          role: "user", 
          content: `Provide a brief explanation of the mathematical concept: ${conceptMap[concept as keyof typeof conceptMap].title}. Keep it concise and suitable for a student learning about this topic.` 
        }],
        model: "gpt-4",
      })

      const text = completion.choices[0].message?.content || ''
      if (!text) {
        throw new Error("No explanation generated. The API response was empty.")
      }

      setExplanation(text)
    } catch (error) {
      console.error("Error generating explanation:", error)
      let errorMessage = "Failed to generate an explanation. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "object" && error !== null) {
        errorMessage = JSON.stringify(error)
      }
      setExplanation(`Error: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const renderConceptNode = (key: string, depth = 0) => {
    const concept = conceptMap[key as keyof typeof conceptMap]
    if (!concept) {
      console.error(`Concept not found: ${key}`)
      return null
    }
    return (
      <div key={key} className={`ml-${depth * 4}`}>
        <Button
          variant="ghost"
          onClick={() => {
            toggleConcept(key)
            getExplanation(key)
          }}
          className="text-left w-full justify-start"
        >
          {concept.title}
        </Button>
        {expandedConcepts.includes(key) && concept.children.map((child) => renderConceptNode(child, depth + 1))}
      </div>
    )
  }

  const generateConcepts = async (topic: string) => {
    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      messages: [{ 
        role: "user", 
        content: `Generate concept map nodes for: ${topic}` 
      }],
      model: "gpt-4",
    })

    return completion.choices[0].message?.content || ''
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Concept Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 max-h-[600px] overflow-y-auto">{renderConceptNode("root")}</div>
          <div>
            {selectedConcept && (
              <Card>
                <CardHeader>
                  <CardTitle>{conceptMap[selectedConcept as keyof typeof conceptMap].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                  ) : (
                    <p>{explanation}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

