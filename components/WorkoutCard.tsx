import Link from "next/link";
import type { Workout } from "@/lib/types";
import WorkoutStats from "./WorkoutStats";


type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition hover:-translate-y-1 hover:border-primary/60"
    >
            <div className="h-48 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-6">
    
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="badge badge-primary badge-sm font-bold uppercase"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="mt-3 font-display text-xl font-bold uppercase">
          {workout.name}
        </h3>
        <p className="mt-1 text-xs text-muted">{workout.equipment}</p>

        <WorkoutStats
          workout={workout}
          className="mt-5 border-t border-base-300 pt-4"
        />
      </div>
    </Link>
  );
}