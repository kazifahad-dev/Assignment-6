import Link from "next/link";
import type { Workout } from "@/lib/types";
import WorkoutStats from "./WorkoutStats";
import Image from "next/image";


type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition hover:-translate-y-1 hover:border-primary/60"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
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