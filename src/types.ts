export type Lang = 'en' | 'az'

export type CourseId =
  | 'ai-engineering'
  | 'backend'
  | 'frontend'
  | 'cybersecurity'
  | 'data-engineering'
  | 'qa'
  | 'helpdesk'

export interface Course {
  id: CourseId
  icon: string
  durationMonths: number
  level: 'beginner' | 'intermediate'
}

export interface QuizOption {
  labelKey: string
  weights: Partial<Record<CourseId, number>>
}

export interface QuizQuestion {
  id: string
  questionKey: string
  options: QuizOption[]
}

export interface SignupData {
  firstName: string
  lastName: string
  email: string
  phone: string
  courseId: CourseId | ''
}
