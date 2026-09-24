import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/lib/types";

type WorkoutStatsProps = {
  workout: Workout; 
  iconClass?: string; 
  className?: string; 
};

export default function WorkoutStats({
  workout,
  iconClass = "text-muted",
  className = "",
}: WorkoutStatsProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/80 ${className}`}
    >
      <span className="flex items-center gap-1.5">
        <Clock className={`h-3.5 w-3.5 ${iconClass}`} aria-hidden />
        {workout.duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame className={`h-3.5 w-3.5 ${iconClass}`} aria-hidden />
        {workout.caloriesBurned} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star className={`h-3.5 w-3.5 ${iconClass}`} aria-hidden />
        {workout.rating}
      </span>
    </div>
  );
}