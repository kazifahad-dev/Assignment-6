"use client";

import { useWorkouts } from "@/lib/useWorkouts";

export default function HomePage() {
  const { workouts, loading, error } = useWorkouts();

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase">
        {workouts.length} workouts loaded
      </h1>
      <ul className="mt-4 space-y-1 text-muted">
        {workouts.map((w) => (
          <li key={w.id}>
            {w.id}. {w.name} — {w.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
}