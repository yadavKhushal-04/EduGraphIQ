"use client"

import { motion } from "framer-motion"
import { ConceptMap } from "@/components/ConceptMap"
import { AIQandA } from "@/components/AIQandA"
import { RecommendedTopics } from "@/components/RecommendedTopics"
import { AIStudyPlanGenerator } from "@/components/AIStudyPlanGenerator"
import { PersonalizedLearningPath } from "@/components/PersonalizedLearningPath"
import { ImageProblemSolver } from "@/components/ImageProblemSolver"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ExplorePage() {
  return (
    <motion.main className="min-h-screen bg-background" initial="initial" animate="animate" variants={staggerChildren}>
      <div className="container mx-auto px-4 py-8">
        <motion.h1 className="text-3xl font-bold mb-6" variants={fadeInUp}>
          Explore Concepts
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div className="lg:col-span-2 space-y-8" variants={staggerChildren}>
            <motion.div variants={fadeInUp}>
              <ConceptMap />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <AIStudyPlanGenerator />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <ImageProblemSolver />
            </motion.div>
          </motion.div>
          <motion.div className="space-y-8" variants={staggerChildren}>
            <motion.div variants={fadeInUp}>
              <RecommendedTopics />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <PersonalizedLearningPath />
            </motion.div>
            <motion.div variants={fadeInUp}>
              <AIQandA />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.main>
  )
}

