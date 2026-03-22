export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-ink-900 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-rust border-t-transparent animate-spin" />
        </div>
        <p className="text-sm font-body text-ink-500">Loading BookMint AI…</p>
      </div>
    </div>
  );
}
