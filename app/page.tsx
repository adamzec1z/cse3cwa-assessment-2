import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="max-w-3xl">
          <p className="mb-3 font-semibold text-blue-700">
            CSE3CWA Assessment 1
          </p>

          <h1 className="text-5xl font-bold leading-tight">
            Create phoneme-based classroom activities
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            A simple activity builder designed for Speech Pathology teachers.
            Create, preview and generate phoneme-based Wordle and Word Search
            activities for classroom use.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
              W
            </div>

            <h2 className="text-2xl font-bold">
              Phoneme Wordle
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Create a Wordle-style activity that helps students practise
              recognising and matching phoneme sounds.
            </p>

            <Link
              href="/wordle"
              className="mt-6 inline-block rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Create Wordle
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
              S
            </div>

            <h2 className="text-2xl font-bold">
              Phoneme Word Search
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Build a classroom word search using phoneme-based words to
              support recognition and literacy activities.
            </p>

            <Link
              href="/word-search"
              className="mt-6 inline-block rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800"
            >
              Create Word Search
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}