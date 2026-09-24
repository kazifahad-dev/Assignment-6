export default function HomePage() {
  return (
    <div>
      <h1 className="font-display text-5xl font-bold uppercase">
        Train with intent.
      </h1>
      <p className="mt-4 text-muted">Theme test</p>

      {/* btn, btn-primary, badge daisyUI-র ক্লাস */}
      <button className="btn btn-primary mt-6">Test button</button>
      <span className="badge badge-primary ml-3">4</span>
      <span className="badge badge-outline ml-2">2</span>
    </div>
  );
}