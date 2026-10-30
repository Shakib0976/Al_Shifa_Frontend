export function LearningCard({ video }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5">
      <p className="text-sm font-semibold text-emerald-700">{video.topic}</p>
      <h3 className="mt-2 text-lg font-semibold">{video.title}</h3>
      <p className="mt-2 leading-6 text-zinc-600">{video.description}</p>
      <span className="mt-4 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
        Coming soon
      </span>
    </article>
  );
}
