"use client";

export default function Error({ error, retry }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-lg leading-7 text-zinc-600">
        Please try again. If the problem continues, contact our support team.
      </p>
      {error?.digest ? (
        <p className="mt-3 text-sm text-zinc-500">
          Reference: {error.digest}
        </p>
      ) : null}
      <button
        className="mt-8 rounded-full bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        onClick={retry}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}
