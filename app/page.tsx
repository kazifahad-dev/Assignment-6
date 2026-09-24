"use client";

import { ArrowDown } from "lucide-react";
import Spinner from "@/components/Spinner";
import WorkoutCard from "@/components/WorkoutCard";
import { useWorkouts } from "@/lib/useWorkouts";
import Image from "next/image";


export default function HomePage() {
  
  const { workouts, loading, error, retry } = useWorkouts();

  return (
    <>
      
      <section className="grid items-center gap-10 rounded-2xl border border-base-300 bg-base-200 p-8 sm:p-12 lg:grid-cols-2 lg:p-14">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            WORKOUT LIBRARY
          </p>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>
          <p className="mt-6 max-w-md text-muted">
            {
              "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up."
            }
          </p>

          
          <a href="#library" className="btn btn-primary mt-8 uppercase">
            Browse Workouts
            <ArrowDown className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="flex justify-center lg:justify-end">
  <Image
    src="/hero.png"
    alt="Workout banner"
    width={600}
    height={600}
    priority
    className="h-auto w-full max-w-xs sm:max-w-sm"
  />
</div>
      </section>

      
      <section id="library" className="mt-16 scroll-mt-24">
        <h2 className="font-display text-3xl font-bold uppercase">
          The Library
        </h2>
        <p className="mt-1 text-sm text-muted">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-8">
          
          {loading && <Spinner />}

         
          {error && (
            <div className="rounded-2xl border border-base-300 bg-base-200 py-16 text-center">
              <p className="text-muted">Could not load workouts. {error}</p>
              <button onClick={retry} className="btn btn-primary mt-4">
                Try again
              </button>
            </div>
          )}

          
          {!loading && !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}