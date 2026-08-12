"use client";

import { useState } from "react";

type Difficulty = "Easy" | "Standard" | "Hard";

type Phoneme = {
  symbol: string;
  hint: string;
};

export default function WordleBuilder() {
  const targetWord = ["/θ/", "/ɪ/", "/n/"];

  const allPhonemes: Phoneme[] = [
    {
      symbol: "/θ/",
      hint: "TH (as in thin)",
    },
    {
      symbol: "/ɪ/",
      hint: "I (as in sit)",
    },
    {
      symbol: "/n/",
      hint: "N (as in thin)",
    },
    {
      symbol: "/æ/",
      hint: "A (as in cat)",
    },
    {
      symbol: "/p/",
      hint: "P (as in pen)",
    },
    {
      symbol: "/ʃ/",
      hint: "SH (as in ship)",
    },
    {
      symbol: "/k/",
      hint: "K (as in cat)",
    },
    {
      symbol: "/s/",
      hint: "S (as in sun)",
    },
    {
      symbol: "/f/",
      hint: "F (as in fish)",
    },
  ];

  const [difficulty, setDifficulty] =
    useState<Difficulty>("Standard");

  const [showHints, setShowHints] =
    useState(true);

  const [guess, setGuess] =
    useState<string[]>([]);

  const [message, setMessage] =
    useState("");

  const [correct, setCorrect] =
    useState(false);

  function getPhonemeCount() {
    if (difficulty === "Easy") {
      return 4;
    }

    if (difficulty === "Hard") {
      return 9;
    }

    return 6;
  }

  const availablePhonemes =
    allPhonemes.slice(
      0,
      getPhonemeCount()
    );

  function getDifficultyDescription() {
    if (difficulty === "Easy") {
      return "4 phoneme choices with fewer distractors.";
    }

    if (difficulty === "Hard") {
      return "9 phoneme choices with more distractors.";
    }

    return "6 phoneme choices with a standard number of distractors.";
  }

  function changeDifficulty(
    newDifficulty: Difficulty
  ) {
    setDifficulty(newDifficulty);

    setGuess([]);

    setMessage("");

    setCorrect(false);
  }

  function addPhoneme(
    symbol: string
  ) {
    if (
      guess.length < 3 &&
      !correct
    ) {
      setGuess([
        ...guess,
        symbol,
      ]);

      setMessage("");
    }
  }

  function removeLast() {
    if (!correct) {
      setGuess(
        guess.slice(0, -1)
      );

      setMessage("");
    }
  }

  function submitGuess() {
    if (guess.length !== 3) {
      setMessage(
        "Choose three phonemes before submitting."
      );

      return;
    }

    const isCorrect =
      guess[0] === targetWord[0] &&
      guess[1] === targetWord[1] &&
      guess[2] === targetWord[2];

    if (isCorrect) {
      setCorrect(true);

      setMessage(
        "Correct! The English word is THIN."
      );
    } else {
      setMessage(
        "Not quite. Try another combination."
      );

      setGuess([]);
    }
  }

  function resetGame() {
    setGuess([]);

    setMessage("");

    setCorrect(false);
  }

  function generateHtml() {
    const difficultyDescription =
      getDifficultyDescription();

    const generatedButtons =
      availablePhonemes
        .map((phoneme) => {
          const hintAttributes =
            showHints
              ? `title="${phoneme.hint}" aria-label="${phoneme.symbol} - ${phoneme.hint}"`
              : `aria-label="${phoneme.symbol}"`;

          return `
            <button
              ${hintAttributes}
              onclick="addPhoneme('${phoneme.symbol}')"
            >
              ${phoneme.symbol}
            </button>
          `;
        })
        .join("");

    const html = `
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >

  <title>
    Phoneme Wordle
  </title>

  <style>

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;

      font-family:
        Arial,
        Helvetica,
        sans-serif;

      background: #f8fafc;

      color: #0f172a;
    }

    .container {
      width: 90%;

      max-width: 700px;

      margin: 50px auto;

      background: white;

      border: 1px solid #e2e8f0;

      border-radius: 16px;

      padding: 32px;

      box-shadow:
        0 2px 8px
        rgba(15, 23, 42, 0.08);
    }

    h1 {
      margin-top: 0;
    }

    .intro {
      color: #475569;

      line-height: 1.6;
    }

    .difficulty {
      display: inline-block;

      margin-top: 15px;

      padding: 8px 14px;

      border-radius: 20px;

      background: #eff6ff;

      color: #1d4ed8;

      font-weight: bold;
    }

    .difficulty-description {
      margin-top: 10px;

      color: #64748b;

      font-size: 14px;
    }

    .boxes {
      display: grid;

      grid-template-columns:
        repeat(3, minmax(70px, 90px));

      gap: 12px;

      margin-top: 30px;
    }

    .box {
      aspect-ratio: 1;

      border: 2px solid #cbd5e1;

      border-radius: 10px;

      display: flex;

      align-items: center;

      justify-content: center;

      background: #f8fafc;

      font-size: 22px;

      font-weight: bold;
    }

    .correct {
      background: #dcfce7;

      border-color: #22c55e;

      color: #166534;
    }

    .phonemes {
      display: flex;

      flex-wrap: wrap;

      gap: 10px;

      margin-top: 15px;
    }

    button {
      padding: 12px 18px;

      border-radius: 8px;

      border: 1px solid #cbd5e1;

      background: white;

      color: #0f172a;

      font-size: 18px;

      font-weight: bold;

      cursor: pointer;
    }

    button:hover {
      background: #eff6ff;

      border-color: #2563eb;
    }

    button:focus {
      outline: 3px solid #2563eb;

      outline-offset: 2px;
    }

    .controls {
      display: flex;

      flex-wrap: wrap;

      gap: 10px;

      margin-top: 25px;
    }

    .submit {
      background: #1d4ed8;

      color: white;

      border: none;
    }

    .submit:hover {
      background: #1e40af;
    }

    .message {
      margin-top: 25px;

      padding: 15px;

      border-radius: 8px;

      background: #fef3c7;

      color: #92400e;

      font-weight: bold;
    }

    .success {
      background: #dcfce7;

      color: #166534;
    }

    .answer {
      margin-top: 20px;

      padding: 20px;

      border-radius: 10px;

      background: #f0fdf4;

      text-align: center;
    }

    .answer-label {
      color: #64748b;

      font-size: 14px;
    }

    .answer-word {
      margin-top: 5px;

      color: #15803d;

      font-size: 32px;

      font-weight: bold;
    }

    @media (
      max-width: 500px
    ) {

      .container {
        width: 95%;

        padding: 20px;
      }

      .boxes {
        grid-template-columns:
          repeat(3, 1fr);
      }

      button {
        padding: 11px 14px;

        font-size: 16px;
      }
    }

  </style>

</head>

<body>

  <main class="container">

    <h1>
      Phoneme Wordle
    </h1>

    <p class="intro">
      Select three phonemes to
      identify the target word.
    </p>

    <div class="difficulty">
      Difficulty:
      ${difficulty}
    </div>

    <p class="difficulty-description">
      ${difficultyDescription}
    </p>

    <div class="boxes">

      <div
        class="box"
        id="box0"
      >
        ?
      </div>

      <div
        class="box"
        id="box1"
      >
        ?
      </div>

      <div
        class="box"
        id="box2"
      >
        ?
      </div>

    </div>

    <h2>
      Available phonemes
    </h2>

    <div class="phonemes">

      ${generatedButtons}

    </div>

    <div class="controls">

      <button
        onclick="removeLast()"
      >
        Delete
      </button>

      <button
        class="submit"
        onclick="submitGuess()"
      >
        Submit Guess
      </button>

      <button
        onclick="resetGame()"
      >
        Reset
      </button>

    </div>

    <div
      id="message"
      aria-live="polite"
    ></div>

    <div
      id="answer"
    ></div>

  </main>

  <script>

    const targetWord = [
      "/θ/",
      "/ɪ/",
      "/n/"
    ];

    let guess = [];

    let completed = false;

    function addPhoneme(
      symbol
    ) {

      if (
        guess.length < 3 &&
        !completed
      ) {

        guess.push(symbol);

        updateBoxes();

        clearMessage();
      }
    }

    function removeLast() {

      if (!completed) {

        guess.pop();

        updateBoxes();

        clearMessage();
      }
    }

    function updateBoxes() {

      for (
        let i = 0;
        i < 3;
        i++
      ) {

        document
          .getElementById(
            "box" + i
          )
          .textContent =
            guess[i] || "?";
      }
    }

    function clearMessage() {

      const message =
        document.getElementById(
          "message"
        );

      message.textContent = "";

      message.className = "";
    }

    function submitGuess() {

      const message =
        document.getElementById(
          "message"
        );

      const answer =
        document.getElementById(
          "answer"
        );

      if (
        guess.length !== 3
      ) {

        message.className =
          "message";

        message.textContent =
          "Choose three phonemes before submitting.";

        return;
      }

      const correct =
        guess[0] ===
          targetWord[0] &&
        guess[1] ===
          targetWord[1] &&
        guess[2] ===
          targetWord[2];

      if (correct) {

        completed = true;

        message.className =
          "message success";

        message.textContent =
          "Correct! The English word is THIN.";

        answer.className =
          "answer";

        answer.innerHTML =
          '<div class="answer-label">' +
          'English equivalent' +
          '</div>' +
          '<div class="answer-word">' +
          'THIN' +
          '</div>';

        for (
          let i = 0;
          i < 3;
          i++
        ) {

          document
            .getElementById(
              "box" + i
            )
            .classList
            .add(
              "correct"
            );
        }

      } else {

        message.className =
          "message";

        message.textContent =
          "Not quite. Try another combination.";

        guess = [];

        updateBoxes();
      }
    }

    function resetGame() {

      guess = [];

      completed = false;

      updateBoxes();

      clearMessage();

      const answer =
        document.getElementById(
          "answer"
        );

      answer.innerHTML = "";

      answer.className = "";

      for (
        let i = 0;
        i < 3;
        i++
      ) {

        document
          .getElementById(
            "box" + i
          )
          .classList
          .remove(
            "correct"
          );
      }
    }

  </script>

</body>

</html>
`;

    const blob =
      new Blob(
        [html],
        {
          type: "text/html",
        }
      );

    const url =
      URL.createObjectURL(
        blob
      );

    const link =
      document.createElement(
        "a"
      );

    link.href = url;

    link.download =
      "phoneme-wordle.html";

    document.body
      .appendChild(link);

    link.click();

    document.body
      .removeChild(link);

    URL.revokeObjectURL(
      url
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">

      {/* SETTINGS */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold">
          Activity Settings
        </h2>

        <p className="mt-2 text-slate-600">
          Configure the Wordle activity and preview the result.
        </p>

        {/* Target word */}
        <div className="mt-8">

          <p className="font-semibold">
            Target phoneme word
          </p>

          <div className="mt-3 flex gap-3">

            {targetWord.map(
              (
                phoneme,
                index
              ) => (
                <div
                  key={`${phoneme}-${index}`}
                  className="flex h-14 min-w-16 items-center justify-center rounded-lg border-2 border-blue-200 bg-blue-50 px-3 text-xl font-bold text-blue-800"
                >
                  {phoneme}
                </div>
              )
            )}

          </div>

        </div>

        {/* Difficulty */}
        <div className="mt-8">

          <label
            htmlFor="difficulty"
            className="block font-semibold"
          >
            Difficulty
          </label>

          <select
            id="difficulty"
            value={difficulty}
            onChange={(
              event
            ) =>
              changeDifficulty(
                event.target
                  .value as Difficulty
              )
            }
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
          >
            <option value="Easy">
              Easy
            </option>

            <option value="Standard">
              Standard
            </option>

            <option value="Hard">
              Hard
            </option>

          </select>

          <p className="mt-3 text-sm text-slate-500">
            {getDifficultyDescription()}
          </p>

        </div>

        {/* Hint setting */}
        <div className="mt-8">

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              checked={showHints}
              onChange={(
                event
              ) =>
                setShowHints(
                  event.target
                    .checked
                )
              }
              className="h-5 w-5"
            />

            <span className="font-semibold">
              Show phoneme hints
            </span>

          </label>

          <p className="ml-8 mt-2 text-sm text-slate-500">
            Hover over phoneme buttons to see an English sound example.
          </p>

        </div>

      </section>

      {/* PREVIEW */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
              Preview
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              Phoneme Wordle
            </h2>

          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
            {difficulty}
          </span>

        </div>

        <p className="mt-5 text-slate-600">
          Select three phonemes to identify the target word.
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {availablePhonemes.length} phoneme choices available.
        </p>

        {/* Guess boxes */}
        <div className="mt-8 grid max-w-xs grid-cols-3 gap-3">

          {[0, 1, 2].map(
            (index) => (
              <div
                key={index}
                className={`flex aspect-square items-center justify-center rounded-lg border-2 text-xl font-bold ${
                  correct
                    ? "border-green-500 bg-green-100 text-green-800"
                    : "border-slate-300 bg-slate-50"
                }`}
              >
                {guess[index] ||
                  "?"}
              </div>
            )
          )}

        </div>

        {/* Phonemes */}
        <div className="mt-8">

          <p className="mb-3 font-semibold">
            Available phonemes
          </p>

          <div className="flex flex-wrap gap-3">

            {availablePhonemes.map(
              (phoneme) => (
                <button
                  key={
                    phoneme.symbol
                  }
                  type="button"
                  onClick={() =>
                    addPhoneme(
                      phoneme.symbol
                    )
                  }
                  title={
                    showHints
                      ? phoneme.hint
                      : undefined
                  }
                  aria-label={
                    showHints
                      ? `${phoneme.symbol} - ${phoneme.hint}`
                      : phoneme.symbol
                  }
                  className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg font-semibold hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  {phoneme.symbol}
                </button>
              )
            )}

          </div>

        </div>

        {/* Controls */}
        <div className="mt-7 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={removeLast}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={submitGuess}
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Submit Guess
          </button>

          <button
            type="button"
            onClick={resetGame}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            Reset
          </button>

        </div>

        {/* Feedback */}
        {message && (
          <div
            aria-live="polite"
            className={`mt-6 rounded-lg p-4 font-semibold ${
              correct
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Correct answer */}
        {correct && (
          <div className="mt-5 rounded-lg bg-green-50 p-5 text-center">

            <p className="text-sm text-slate-500">
              English equivalent
            </p>

            <p className="mt-1 text-3xl font-bold text-green-700">
              THIN
            </p>

          </div>
        )}

        {/* Generate HTML */}
        <div className="mt-8 border-t border-slate-200 pt-6">

          <button
            type="button"
            onClick={generateHtml}
            className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
          >
            Generate HTML
          </button>

          <p className="mt-2 text-sm text-slate-500">
            Downloads the current settings as a standalone playable HTML file.
          </p>

        </div>

      </section>

    </div>
  );
}