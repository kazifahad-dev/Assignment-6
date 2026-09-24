"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { Bookmark, CalendarPlus } from "lucide-react";
import Spinner from "@/components/Spinner";
import { ApiError, getWorkout } from "@/lib/api";
import type { Workout } from "@/lib/types";
import { MAX_PLAN, usePlan } from "@/context/PlanContext";
import Image from "next/image";

type State = {
  id: string;
  workout: Workout | null;
  notFound: boolean;
} | null; 

export default function WorkoutDetailsPage() {
 
  const { id } = useParams<{ id: string }>();
  const { plan, addToPlan, addToSaved } = usePlan();

  const [state, setState] = useState<State>(null);

  useEffect(() => {
    let cancelled = false; 

    getWorkout(id)
      .then((workout) => {
        if (!cancelled) setState({ id, workout, notFound: false });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          
          const notFound = err instanceof ApiError && err.status === 404;
          setState({ id, workout: null, notFound });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  
  if (state === null || state.id !== id) {
    return <Spinner label="Loading workout…" />;
  }

  
  if (state.workout === null) {
    return (
      <div className="py-24 text-center">
        <h1 className="font-display text-3xl font-bold uppercase">
          {state.notFound ? "Workout not found" : "Something went wrong"}
        </h1>
        <Link href="/" className="btn btn-primary mt-6">
          Back to workouts
        </Link>
      </div>
    );
  }

  
  const workout = state.workout;

  
  const planIsFull = !plan.includes(workout.id) && plan.length >= MAX_PLAN;

  const handleAddToPlan = () => {
    
    const result = addToPlan(workout.id);

    if (result === "added") toast.success("Added to today's plan");
    else if (result === "exists") toast("Already in today's plan");
    else toast.error(`Today's plan is full (max ${MAX_PLAN} lifts)`);
  };

  const handleSave = () => {
    const result = addToSaved(workout.id);

    if (result === "added") toast.success("Saved for later");
    else toast("Already saved");
  };

  
  const specs: [string, string | number][] = [
    ["Equipment", workout.equipment],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.caloriesBurned} kcal`],
    ["Rating", workout.rating],
  ];

  return (
    
    <div className="grid gap-10 lg:grid-cols-2">
      
        <div>
                  <div>
        <div className="lg:sticky lg:top-24">
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-2xl">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      </div>

     
      <div>
        <h1 className="font-display text-4xl font-bold uppercase sm:text-5xl">
          {workout.name}
        </h1>
        <p className="mt-4 text-lg text-muted">{workout.description}</p>

        
        <div className="mt-5 flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span key={group} className="badge badge-primary font-semibold">
              {group}
            </span>
          ))}
        </div>

        
        <dl className="mt-8 divide-y divide-base-300 rounded-2xl border border-base-300 bg-base-200">
          {specs.map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between px-6 py-3.5 text-sm"
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                {label}
              </dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        
        <h2 className="mt-8 text-lg font-bold uppercase">Instructions</h2>
        <ol className="mt-4 space-y-3 text-white/85">
          {workout.instructions.map((step, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-white/60">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>

        
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleAddToPlan}
            disabled={planIsFull}
            title={planIsFull ? "Your plan already has 5 lifts" : undefined}
            className="btn btn-primary"
          >
            <CalendarPlus className="h-4 w-4" aria-hidden />
            {"Add to today's plan"}
          </button>
          <button onClick={handleSave} className="btn btn-outline">
            <Bookmark className="h-4 w-4" aria-hidden />
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
}