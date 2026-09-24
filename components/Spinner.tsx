type SpinnerProps = {
  label?: string;
};

export default function Spinner({ label = "Loading workouts…" }: SpinnerProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-24 text-muted"
    >
      <span className="loading loading-spinner loading-lg text-primary" />
      <p className="text-sm">{label}</p>
    </div>
  );
}