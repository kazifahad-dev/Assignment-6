# 🏋️ FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion. Browse a library of twelve lifts, open a workout to see its specs and instructions, lock it into today's plan or save it for later, and watch your daily minutes and calories add up.

**Live site:** _add your deployed link here_

## 🛠 Technologies Used

- [Next.js](https://nextjs.org/) (App Router)
- React and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/)
- [lucide-react](https://lucide.dev/) for icons
- [react-hot-toast](https://react-hot-toast.com/) for toast notifications
- Oswald and Inter (Google Fonts via `next/font`)

## ✨ Features

1. **Workout Library** — responsive 3×4 grid (1 → 2 → 3 columns) with images, muscle-group tags, equipment and duration / calories / rating stats, plus a loading spinner while data is fetched.
2. **Workout Details** — two-column layout with a large image, key specs panel and step-by-step instructions.
3. **Today's Plan and Saved** — add a workout to today's plan (capped at 5 lifts) or save it for later, with live navbar badge counters and toast feedback.
4. **My Plan page** — live Exercises / Minutes / Calories summary, Today's Plan / Saved tabs, "Mark as Done" and remove actions, and a friendly empty state.
5. **Sorting** — sort the plan or saved list by Duration, Calories or Rating.
6. **Persistent data** — the plan, saved list and completed lifts are stored in `localStorage`, so they survive a page reload.
7. **Fully responsive** with a custom 404 page for unknown routes.

## 🚀 Getting Started

```bash
git clone <your-repo-url>
cd fit-log
npm install
npm run dev
```

Open http://localhost:3000.

## 🔌 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`