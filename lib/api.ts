import type { Workout } from "./types";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new ApiError("Failed to load workouts.", res.status);
  return res.json();
}


export async function getWorkout(id: string | number): Promise<Workout> {
  const res = await fetch(`${BASE_URL}/${id}`);
  const data = res.ok ? await res.json() : null;

  
  if (res.status === 404 || !data || data.error || !data.id) {
    throw new ApiError("Workout not found.", 404);
  }
  return data;
}