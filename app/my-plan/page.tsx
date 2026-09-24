"use client";

import { useState } from "react";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import WorkoutStats from "@/components/WorkoutStats";
import { useWorkouts } from "@/lib/useWorkouts";
import { usePlan } from "@/context/PlanContext";


type Tab = "plan" | "saved";

const TABS: { key: Tab; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

export default function MyPlanPage() {
  
  const { workouts, loading, error, retry } = useWorkouts();
  
  const { plan, saved } = usePlan();

  
  const [tab, setTab] = useState<Tab>("plan");

  
  const planItems = workouts.filter((w) => plan.includes(w.id));
  const savedItems = workouts.filter((w) => saved.includes(w.id));

  
  const visibleItems = tab === "plan" ? planItems : savedItems;

  
  const totalMinutes = planItems.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = planItems.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const metrics = [
    { label: "Exercises", value: planItems.length, accent: true },
    { label: "Minutes", value: totalMinutes, accent: false },
    { label: "Calories", value: totalCalories, accent: false },
  ];

  return (
    <>
      <h1 className="font-display text-4xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      
      <div className="stats stats-vertical mt-8 w-full border border-base-300 bg-base-200 sm:stats-horizontal">
        {metrics.map((m) => (
          <div key={m.label} className="stat">
            <div className="stat-title">{m.label}</div>
            <div
              className={`stat-value font-display ${m.accent ? "text-primary" : ""}`}
            >
              {m.value}
            </div>
          </div>
        ))}
      </div>

      
      <div role="tablist" className="tabs tabs-box mt-8 w-fit">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            onClick={() => setTab(key)}
            className={`tab ${tab === key ? "tab-active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      
      <div className="mt-6 space-y-4">
        
        {loading && <Spinner label="Loading workouts…" />}

        
        {error && (
          <div className="rounded-2xl border border-base-300 bg-base-200 py-12 text-center">
            <p className="text-muted">Could not load workouts. {error}</p>
            <button onClick={retry} className="btn btn-primary mt-4">
              Try again
            </button>
          </div>
        )}

        
        {!loading && !error && visibleItems.length === 0 && (
          <div className="flex flex-col items-center rounded-2xl border border-base-300 bg-base-200 py-16 text-center">
            <h2 className="font-display text-xl font-bold uppercase">
              Nothing here yet
            </h2>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link href="/" className="btn btn-primary mt-6">
              Go to workouts
            </Link>
          </div>
        )}

        
        {!loading &&
          !error &&
          visibleItems.map((w) => (
            <article
              key={w.id}
              className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={w.image}
                  alt={w.name}
                  className="h-20 w-36 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <h2 className="font-display text-lg font-bold uppercase">
                    {w.name}
                  </h2>
                  <p className="text-xs font-semibold text-muted">
                    {w.equipment}
                  </p>
                  
                  <WorkoutStats
                    workout={w}
                    iconClass="text-primary"
                    className="mt-2"
                  />
                </div>
              </div>

              
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/workout/${w.id}`}
                  className="btn btn-outline btn-sm rounded-full"
                >
                  View Details
                </Link>
              </div>
            </article>
          ))}
      </div>
    </>
  );
}