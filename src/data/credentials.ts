import type { AcademyUser, Group } from '../types/academy'

export const GROUPS: Group[] = [
  { id: 'bs203', name: 'BS203 — Backend Development' },
  { id: 'fe101', name: 'FE101 — Frontend Development' },
]

export const USERS: Record<string, AcademyUser> = {
  'student-1': {
    id: 'student-1',
    role: 'student',
    firstName: 'Ali',
    lastName: 'Ibrahimov',
    email: 'student@mindcraft.academy',
    avatar: 'https://i.pravatar.cc/120?u=student1',
    groupId: 'bs203',
    level: 12,
    xp: 12250,
    xpMax: 20000,
    streak: 32,
  },
  'student-2': {
    id: 'student-2',
    role: 'student',
    firstName: 'Kamran',
    lastName: 'Rzazade',
    email: 'kamran@mindcraft.academy',
    avatar: 'https://i.pravatar.cc/120?u=student2',
    groupId: 'bs203',
    level: 8,
    xp: 6400,
    xpMax: 12000,
    streak: 14,
  },
  'student-3': {
    id: 'student-3',
    role: 'student',
    firstName: 'Nərgiz',
    lastName: 'Əliyeva',
    email: 'nergiz@mindcraft.academy',
    avatar: 'https://i.pravatar.cc/120?u=student3',
    groupId: 'bs203',
    level: 10,
    xp: 9100,
    xpMax: 15000,
    streak: 21,
  },
  'teacher-1': {
    id: 'teacher-1',
    role: 'teacher',
    firstName: 'Elmin',
    lastName: 'Ibrahimov',
    email: 'teacher@mindcraft.academy',
    avatar: 'https://i.pravatar.cc/120?u=teacher1',
    groupId: 'bs203',
    level: 0,
    xp: 0,
    xpMax: 0,
    streak: 0,
  },
}

export const LOGIN_ACCOUNTS = [
  { email: 'student@mindcraft.academy', password: 'student123', userId: 'student-1' },
  { email: 'teacher@mindcraft.academy', password: 'teacher123', userId: 'teacher-1' },
] as const

export function getGroupName(groupId: string): string {
  return GROUPS.find((g) => g.id === groupId)?.name ?? groupId
}

export function getGroupStudents(groupId: string): AcademyUser[] {
  return Object.values(USERS).filter((u) => u.role === 'student' && u.groupId === groupId)
}

export function getUserById(id: string): AcademyUser | undefined {
  return USERS[id]
}
