import type { AcademyData } from '../types/academy'

const STORAGE_KEY = 'mindcraft_academy_data'

const defaultData: AcademyData = {
  materials: [
    {
      id: 'm1',
      groupId: 'bs203',
      title: 'Introduction to REST APIs',
      type: 'video',
      url: 'https://www.youtube.com/embed/lsMQ0LUrZnQ',
      description: 'Week 1 — HTTP methods and status codes',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'm2',
      groupId: 'bs203',
      title: 'Node.js Project Structure',
      type: 'document',
      url: '#',
      description: 'PDF guide — folder layout and best practices',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'm3',
      groupId: 'bs203',
      title: 'Database Design Basics',
      type: 'video',
      url: 'https://www.youtube.com/embed/ztHopE5Wnpc',
      description: 'Week 2 — normalization and relationships',
      createdAt: new Date().toISOString(),
    },
  ],
  assignments: [
    {
      id: 'a1',
      groupId: 'bs203',
      title: 'Build a CRUD API',
      description: 'Create a REST API with Express and SQLite for a simple todo app.',
      deadline: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
      createdBy: 'teacher-1',
      createdAt: new Date().toISOString(),
    },
  ],
  submissions: [],
  attendance: [],
  announcements: [
    {
      id: 'n1',
      groupId: 'bs203',
      title: 'Welcome to BS203',
      body: 'First lab session is on Friday. Bring your laptops!',
      createdBy: 'teacher-1',
      createdAt: new Date().toISOString(),
      readBy: [],
    },
  ],
  messages: [],
}

export function loadAcademyData(): AcademyData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultData)
    return { ...structuredClone(defaultData), ...JSON.parse(raw) } as AcademyData
  } catch {
    return structuredClone(defaultData)
  }
}

export function saveAcademyData(data: AcademyData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function uid(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
