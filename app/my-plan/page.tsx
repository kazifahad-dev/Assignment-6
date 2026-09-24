"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast"; 
import { Check, X } from "lucide-react";  
import Spinner from "@/components/Spinner";
import WorkoutStats from "@/components/WorkoutStats";
import { useWorkouts } from "@/lib/useWorkouts";
import type { Workout } from "@/lib/types"; 
import { usePlan } from "@/context/PlanContext";

type Tab = "plan" | "saved";

const TABS: { key: Tab; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];


type SortKey = "duration" | "calories" | "rating";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];


const SORTERS: Record<SortKey, (a: Workout, b: Workout) => number> = {
  duration: (a, b) => a.duration - b.duration,
  calories: (a, b) => a.caloriesBurned - b.caloriesBurned,
  rating: (a, b) => b.rating - a.rating,
};

export default function MyPlanPage() {
  const { workouts, loading, error, retry } = useWorkouts();
  
  const { plan, saved, done, removeFromPlan, removeFromSaved, markDone } =
    usePlan();

  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration"); 

  const planItems = workouts.filter((w) => plan.includes(w.id));
  const savedItems = workouts.filter((w) => saved.includes(w.id));

 
  const visibleItems = [...(tab === "plan" ? planItems : savedItems)].sort(
    SORTERS[sortBy],
  );

  const totalMinutes = planItems.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = planItems.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const metrics = [
    { label: "Exercises", value: planItems.length, accent: true },
    { label: "Minutes", value: totalMinutes, accent: false },
    { label: "Calories", value: totalCalories, accent: false },
  ];

  
  const handleRemove = (id: number) => {
    if (tab === "plan") {
      removeFromPlan(id);
      toast.success("Removed from today's plan");
    } else {
      removeFromSaved(id);
      toast.success("Removed from saved");
    }
  };

  
  const handleDone = (id: number) => {
    markDone(id);
    toast.success("Nice work! Marked as done");
  };

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

     
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" className="tabs tabs-box w-fit">
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

       
        <label className="flex items-center gap-3 text-sm text-muted">
          Sort By
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortKey)}
            className="select select-sm w-auto"
          >
            {SORT_OPTIONS.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
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
          visibleItems.map((w) => {
           
            const isDone = done.includes(w.id);

            return (
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
                    
                    <h2
                      className={`font-display text-lg font-bold uppercase ${
                        isDone && tab === "plan"
                          ? "text-white/50 line-through"
                          : ""
                      }`}
                    >
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

                 
                  {tab === "plan" &&
                    (isDone ? (
                      <span className="badge badge-outline badge-primary gap-1 py-4">
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Done
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDone(w.id)}
                        className="btn btn-primary btn-sm rounded-full"
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden />
                        Mark as Done
                      </button>
                    ))}

                  
                  <button
                    onClick={() => handleRemove(w.id)}
                    aria-label={`Remove ${w.name}`}
                    className="btn btn-ghost btn-circle btn-sm"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
}