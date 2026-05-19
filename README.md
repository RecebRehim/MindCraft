# MindCraft Academy

Bilingual (EN / AZ) website for an IT academy — public landing pages plus a student and teacher academy panel. Data is stored in the browser (`localStorage`) for demo use.

## Stack

React 19 · Vite 6 · TypeScript · Tailwind CSS 4 · React Router

## What's included

**Public site** — programs, career quiz, course signup, mentors & events pages

**Academy panel** (`/academy`) — materials, assignments, attendance, grades, messages, notifications (role-based views)

## Demo logins

| Role    | Email                         | Password     |
|---------|-------------------------------|--------------|
| Student | `student@mindcraft.academy`   | `student123` |
| Teacher | `teacher@mindcraft.academy`   | `teacher123` |

## Programs

AI Engineering · Backend · Frontend · Cybersecurity · Data Engineering · QA · Helpdesk

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
npm run preview  # preview production build
```

## Deploy

Static SPA — deploy the `dist/` folder. `vercel.json` and `public/_redirects` handle client-side routing.
