import type { CourseId } from '../types'
import { courses } from '../data/courses'
import { quizQuestions } from '../data/quiz'

export function calculateBestCourse(answers: number[]): CourseId {
  const scores: Record<CourseId, number> = Object.fromEntries(
    courses.map((c) => [c.id, 0]),
  ) as Record<CourseId, number>

  answers.forEach((optionIndex, questionIndex) => {
    const question = quizQuestions[questionIndex]
    const option = question?.options[optionIndex]
    if (!option) return
    for (const [courseId, weight] of Object.entries(option.weights)) {
      scores[courseId as CourseId] += weight
    }
  })

  return courses.reduce((best, course) =>
    scores[course.id] > scores[best.id] ? course : best,
  ).id
}
