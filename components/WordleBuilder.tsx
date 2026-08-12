"use client";

import { useState } from "react";

export default function WordleBuilder() {
  const [difficulty, setDifficulty] = useState("Standard");
  const [showHints, setShowHints] = useState(true);
  const [guess, setGuess] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [correct, setCorrect] = useState(false);

  const targetWord = ["/θ/", "/ɪ/", "/n/"];

  const phonemes = [
    { symbol: "/θ/", hint: "TH (as in thin)" },
    { symbol: "/ɪ/", hint: "I (as in sit)" },
    { symbol: "/n/", hint: "N (as in thin)" },
    { symbol: "/æ/", hint: "A (as in cat)" },
    { symbol: "/p/", hint: "P (as in pen)" },
    { symbol: "/ʃ/", hint: "SH (as in ship)" },
  ];

  function addPhoneme(symbol: string) {
    if (guess.length < 3 && !correct) {
      setGuess([...guess, symbol]);
      setMessage("");
    }
  }

  function removeLast() {
    if (!correct) {
      setGuess(guess.slice(0, -1));
      setMessage("");
    }
  }

  function submitGuess() {
    if (guess.length !== 3) {
      setMessage("Choose three phonemes before submitting.");
      return;
    }

    const isCorrect =
      guess[0] === targetWord[0] &&
      guess[1] === targetWord[1] &&
      guess[2] === targetWord[2];

    if (isCorrect) {
      setCorrect(true);
      setMessage("Correct! The English word is THIN.");
    } else {
      setMessage("Not quite. Try another combination.");
      setGuess([]);
    }
  }

  function resetGame() {
    setGuess([]);
    setMessage("");
    setCorrect(false);
  }

  function generateHtml() {
  const hintTheta = showHints ? 'title="TH (as in thin)"' : "";
  const hintI = showHints ? 'title="I (as in sit)"' : "";
  const hintN = showHints ? 'title="N (as in thin)"' : "";
  const hintA = showHints ? 'title="A (as in cat)"' : "";
  const hintP = showHints ? 'title="P (as in pen)"' : "";
  const hintSh = showHints ? 'title="SH (as in ship)"' : "";

  const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Phoneme Wordle</title>

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
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
    }

    h1 {
      margin-bottom: 10px;
    }

    .difficulty {
      display: inline-block;
      background: #f1f5f9;
      padding: 8px 14px;
      border-radius: 20px;
      margin-bottom: 20px;
    }

    .boxes {
      display: grid;
      grid-template-columns: repeat(3, 90px);
      gap: 12px;
      margin-top: 30px;
    }

    .box {
      width: 90px;
      height: 90px;
      border: 2px solid #cbd5e1;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: bold;
      background: #f8fafc;
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
      font-size: 18px;
      cursor: pointer;
    }

    button:hover {
      background: #eff6ff;
      border-color: #2563eb;
    }

    button:focus {
      outline: 3px solid #2563eb;
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

    .message {
      margin-top: 25px;
      padding: 15px;
      border-radius: 8px;
      background: #fef3c7;
      font-weight: bold;
    }

    .success {
      background: #dcfce7;
      color: #166534;
    }

    .answer {
      font-size: 32px;
      font-weight: bold;
      color: #15803d;
      margin-top: 15px;
    }
  </style>
</head>

<body>

  <main class="container">

    <h1>Phoneme Wordle</h1>

    <div class="difficulty">
      Difficulty: ${difficulty}
    </div>

    <p>
      Select three phonemes to identify the target word.
    </p>

    <div class="boxes">
      <div class="box" id="box0">?</div>
      <div class="box" id="box1">?</div>
      <div class="box" id="box2">?</div>
    </div>

    <h2>Available phonemes</h2>

    <div class="phonemes">

      <button ${hintTheta} onclick="addPhoneme('/θ/')">
        /θ/
      </button>

      <button ${hintI} onclick="addPhoneme('/ɪ/')">
        /ɪ/
      </button>

      <button ${hintN} onclick="addPhoneme('/n/')">
        /n/
      </button>

      <button ${hintA} onclick="addPhoneme('/æ/')">
        /æ/
      </button>

      <button ${hintP} onclick="addPhoneme('/p/')">
        /p/
      </button>

      <button ${hintSh} onclick="addPhoneme('/ʃ/')">
        /ʃ/
      </button>

    </div>

    <div class="controls">

      <button onclick="removeLast()">
        Delete
      </button>

      <button class="submit" onclick="submitGuess()">
        Submit Guess
      </button>

      <button onclick="resetGame()">
        Reset
      </button>

    </div>

    <div id="message"></div>

    <div id="answer"></div>

  </main>

  <script>
    const targetWord = ["/θ/", "/ɪ/", "/n/"];

    let guess = [];

    let completed = false;

    function addPhoneme(symbol) {
      if (guess.length < 3 && !completed) {
        guess.push(symbol);
        updateBoxes();
      }
    }

    function removeLast() {
      if (!completed) {
        guess.pop();
        updateBoxes();
      }
    }

    function updateBoxes() {
      for (let i = 0; i < 3; i++) {
        document.getElementById("box" + i).textContent =
          guess[i] || "?";
      }
    }

    function submitGuess() {
      const message = document.getElementById("message");
      const answer = document.getElementById("answer");

      if (guess.length !== 3) {
        message.className = "message";
        message.textContent =
          "Choose three phonemes before submitting.";

        return;
      }

      const correct =
        guess[0] === targetWord[0] &&
        guess[1] === targetWord[1] &&
        guess[2] === targetWord[2];

      if (correct) {
        completed = true;

        message.className = "message success";

        message.textContent =
          "Correct! The English word is THIN.";

        answer.className = "answer";

        answer.textContent = "THIN";

        for (let i = 0; i < 3; i++) {
          document
            .getElementById("box" + i)
            .classList.add("correct");
        }
      } else {
        message.className = "message";

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

      document.getElementById("message").textContent = "";

      document.getElementById("message").className = "";

      document.getElementById("answer").textContent = "";

      document.getElementById("answer").className = "";

      for (let i = 0; i < 3; i++) {
        document
          .getElementById("box" + i)
          .classList.remove("correct");
      }
    }
  </script>

</body>

</html>
`;

  const blob = new Blob([html], {
    type: "text/html",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = "phoneme-wordle.html";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
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

        <div className="mt-8">
          <p className="font-semibold">
            Target phoneme word
          </p>

          <div className="mt-3 flex gap-3">
            {targetWord.map((phoneme) => (
              <div
                key={phoneme}
                className="flex h-14 min-w-16 items-center justify-center rounded-lg border-2 border-blue-200 bg-blue-50 px-3 text-xl font-bold text-blue-800"
              >
                {phoneme}
              </div>
            ))}
          </div>
        </div>

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
            onChange={(event) => setDifficulty(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
          >
            <option>Easy</option>
            <option>Standard</option>
            <option>Hard</option>
          </select>
        </div>

        <div className="mt-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={showHints}
              onChange={(event) => setShowHints(event.target.checked)}
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
        <div className="flex items-center justify-between">
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

        {/* Guess boxes */}
        <div className="mt-8 grid max-w-xs grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`flex aspect-square items-center justify-center rounded-lg border-2 text-xl font-bold ${
                correct
                  ? "border-green-500 bg-green-100 text-green-800"
                  : "border-slate-300 bg-slate-50"
              }`}
            >
              {guess[index] || "?"}
            </div>
          ))}
        </div>

        {/* Phoneme buttons */}
        <div className="mt-8">
          <p className="mb-3 font-semibold">
            Available phonemes
          </p>

          <div className="flex flex-wrap gap-3">
            {phonemes.map((phoneme) => (
              <button
                key={phoneme.symbol}
                type="button"
                onClick={() => addPhoneme(phoneme.symbol)}
                title={showHints ? phoneme.hint : undefined}
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-lg font-semibold hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {phoneme.symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={removeLast}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-semibold hover:bg-slate-100"
          >
            Delete
          </button>

          <button
            type="button"
            onClick={submitGuess}
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Submit Guess
          </button>

          <button
            type="button"
            onClick={resetGame}
            className="rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"
          >
            Reset
          </button>
        </div>

        {/* Feedback */}
        {message && (
          <div
            className={`mt-6 rounded-lg p-4 font-semibold ${
              correct
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {message}
          </div>
        )}

        {correct && (
          <div className="mt-5 text-center">
            <p className="text-sm text-slate-500">
              English equivalent
            </p>

            <p className="mt-1 text-3xl font-bold text-green-700">
              THIN
            </p>
          </div>
        )}

        <div className="mt-8 border-t border-slate-200 pt-6">
        <button
  type="button"
  onClick={generateHtml}
  className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
>
  Generate HTML
</button>

<p className="mt-2 text-sm text-slate-500">
  Downloads the activity as a standalone HTML file.
</p>
        </div>
      </section>
    </div>
  );
}