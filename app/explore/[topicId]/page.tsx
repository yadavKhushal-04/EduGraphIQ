import { QuestionExploration } from "@/components/QuestionExploration"
import { ConceptMap } from "@/components/ConceptMap"
import { LearningPath } from "@/components/LearningPath"
import { AIQandA } from "@/components/AIQandA"

export default function ExploreTopic({ params }: { params: { topicId: string } }) {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Explore: Linear Equations</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <QuestionExploration />
            <ConceptMap className="mt-8" />
          </div>
          <div className="space-y-8">
            <LearningPath />
            <AIQandA />
          </div>
        </div>
      </div>
    </main>
  )
}

