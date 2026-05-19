import type { QuizQuestion } from '../types'

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    questionKey: 'quiz.q1',
    options: [
      { labelKey: 'quiz.q1.a', weights: { 'ai-engineering': 3, backend: 1 } },
      { labelKey: 'quiz.q1.b', weights: { frontend: 3, qa: 1 } },
      { labelKey: 'quiz.q1.c', weights: { helpdesk: 3, cybersecurity: 1 } },
      { labelKey: 'quiz.q1.d', weights: { 'data-engineering': 3, backend: 1 } },
    ],
  },
  {
    id: 'q2',
    questionKey: 'quiz.q2',
    options: [
      { labelKey: 'quiz.q2.a', weights: { frontend: 3, qa: 2 } },
      { labelKey: 'quiz.q2.b', weights: { backend: 3, 'data-engineering': 2 } },
      { labelKey: 'quiz.q2.c', weights: { cybersecurity: 3, helpdesk: 1 } },
      { labelKey: 'quiz.q2.d', weights: { 'ai-engineering': 3, 'data-engineering': 1 } },
    ],
  },
  {
    id: 'q3',
    questionKey: 'quiz.q3',
    options: [
      { labelKey: 'quiz.q3.a', weights: { helpdesk: 3, qa: 1 } },
      { labelKey: 'quiz.q3.b', weights: { cybersecurity: 3, backend: 1 } },
      { labelKey: 'quiz.q3.c', weights: { 'data-engineering': 3, 'ai-engineering': 2 } },
      { labelKey: 'quiz.q3.d', weights: { frontend: 3, backend: 1 } },
    ],
  },
  {
    id: 'q4',
    questionKey: 'quiz.q4',
    options: [
      { labelKey: 'quiz.q4.a', weights: { qa: 3, helpdesk: 2 } },
      { labelKey: 'quiz.q4.b', weights: { 'ai-engineering': 3, 'data-engineering': 2 } },
      { labelKey: 'quiz.q4.c', weights: { backend: 3, frontend: 1 } },
      { labelKey: 'quiz.q4.d', weights: { cybersecurity: 3, backend: 1 } },
    ],
  },
  {
    id: 'q5',
    questionKey: 'quiz.q5',
    options: [
      { labelKey: 'quiz.q5.a', weights: { helpdesk: 3 } },
      { labelKey: 'quiz.q5.b', weights: { frontend: 2, qa: 2 } },
      { labelKey: 'quiz.q5.c', weights: { backend: 3, 'data-engineering': 2 } },
      { labelKey: 'quiz.q5.d', weights: { cybersecurity: 3 } },
    ],
  },
  {
    id: 'q6',
    questionKey: 'quiz.q6',
    options: [
      { labelKey: 'quiz.q6.a', weights: { 'ai-engineering': 3, 'data-engineering': 2 } },
      { labelKey: 'quiz.q6.b', weights: { frontend: 3 } },
      { labelKey: 'quiz.q6.c', weights: { qa: 3, helpdesk: 1 } },
      { labelKey: 'quiz.q6.d', weights: { cybersecurity: 3, backend: 1 } },
    ],
  },
  {
    id: 'q7',
    questionKey: 'quiz.q7',
    options: [
      { labelKey: 'quiz.q7.a', weights: { 'data-engineering': 3, backend: 2 } },
      { labelKey: 'quiz.q7.b', weights: { helpdesk: 3, qa: 1 } },
      { labelKey: 'quiz.q7.c', weights: { 'ai-engineering': 3 } },
      { labelKey: 'quiz.q7.d', weights: { frontend: 3, backend: 1 } },
    ],
  },
  {
    id: 'q8',
    questionKey: 'quiz.q8',
    options: [
      { labelKey: 'quiz.q8.a', weights: { cybersecurity: 3 } },
      { labelKey: 'quiz.q8.b', weights: { qa: 3, frontend: 1 } },
      { labelKey: 'quiz.q8.c', weights: { backend: 3, 'data-engineering': 1 } },
      { labelKey: 'quiz.q8.d', weights: { 'ai-engineering': 3, frontend: 1 } },
    ],
  },
]
