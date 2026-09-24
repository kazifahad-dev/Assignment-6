import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-base-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Logo size="sm" />
        <p className="text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}