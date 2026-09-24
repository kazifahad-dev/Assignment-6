import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-24 text-center">
      <p className="font-display text-8xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to workouts
      </Link>
    </div>
  );
}