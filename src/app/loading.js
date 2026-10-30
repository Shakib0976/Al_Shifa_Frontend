export default function Loading() {
  return (
    <div
      aria-live="polite"
      className="mx-auto flex min-h-[50vh] max-w-7xl items-center justify-center px-6 py-20"
      role="status"
    >
      <span className="size-8 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-800" />
      <span className="sr-only">Loading page</span>
    </div>
  );
}
