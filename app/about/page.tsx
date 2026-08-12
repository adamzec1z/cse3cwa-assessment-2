export default function AboutPage() {
  return (
    <main className="bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto max-w-5xl">

        <p className="font-semibold text-blue-700">
          CSE3CWA Assessment 1
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          About This Project
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          The Phoneme Activity Builder is a frontend classroom tool designed
          for Speech Pathology teachers. It allows teachers to create,
          preview and generate phoneme-based learning activities.
        </p>

        {/* Project information */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Project Overview
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Assessment 1 focuses on frontend design, usability and
            accessibility. This stage does not use a database or dynamic
            word-list system. These features can be introduced in later
            stages of the project.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            The website provides two classroom activity builders: a phoneme
            Wordle activity and a phoneme Word Search activity. Teachers can
            preview each activity before generating a standalone HTML file
            that can be opened in a normal web browser.
          </p>

        </section>

        {/* Activity information */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 font-bold text-blue-800">
              W
            </div>

            <h2 className="text-xl font-bold">
              Phoneme Wordle
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              The Wordle activity asks students to identify a target word
              using phoneme symbols. Phoneme buttons can provide hover hints
              showing their English sound equivalents.
            </p>

          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 font-bold text-green-800">
              S
            </div>

            <h2 className="text-xl font-bold">
              Phoneme Word Search
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              The Word Search activity uses a small set of phoneme-based
              words. Students select phoneme sequences and receive feedback
              when they identify a target word correctly.
            </p>

          </section>

        </div>

        {/* Student information */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Student Information
          </h2>

          <div className="mt-6 space-y-3">

            <p>
              <span className="font-semibold">
                Name:
              </span>{" "}
              Adam Zec
            </p>

            <p>
              <span className="font-semibold">
                Student Number:
              </span>{" "}
              21562377
            </p>

            <p>
              <span className="font-semibold">
                Subject:
              </span>{" "}
              CSE3CWA
            </p>

            <p>
              <span className="font-semibold">
                Assessment:
              </span>{" "}
              Assessment 1 — Frontend Design and Usability
            </p>

          </div>

        </section>

        {/* Instruction video */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            How to Use the Website
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            This short demonstration explains how to navigate the website,
            configure the activities, preview them and generate a standalone
            HTML file.
          </p>

          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-black">

            <video
              controls
              className="w-full"
              preload="metadata"
            >
              <source
                src="/how-to-use.mp4"
                type="video/mp4"
              />

              Your browser does not support the video element.
            </video>

          </div>

        </section>

      </div>
    </main>
  );
}