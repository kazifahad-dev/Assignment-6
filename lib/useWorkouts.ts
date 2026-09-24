"use client";

import { useEffect, useState } from "react";
import { getAllWorkouts } from "./api";
import type { Workout } from "./types";


type State = { workouts: Workout[]; error: string | null } | null;

export function useWorkouts() {
  const [state, setState] = useState<State>(null);
  const [attempt, setAttempt] = useState(0); 

  useEffect(() => {
    let cancelled = false; 
    getAllWorkouts()
      .then((workouts) => {
        if (!cancelled) setState({ workouts, error: null });
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Something went wrong.";
          setState({ workouts: [], error: message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = () => {
    setState(null); 
    setAttempt((n) => n + 1);
  };

  return {
    workouts: state?.workouts ?? [],
    loading: state === null,
    error: state?.error ?? null,
    retry,
  };
}