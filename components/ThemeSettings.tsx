"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeSettings() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const themeCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("theme="));

    const savedTheme =
      themeCookie?.split("=")[1] === "dark"
        ? "dark"
        : "light";

    setTheme(savedTheme);

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);

  function changeTheme(newTheme: Theme) {
    setTheme(newTheme);

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    document.cookie =
      `theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Appearance
      </h2>

      <p className="mt-2 text-slate-600">
        Choose the appearance of the activity builder.
        Your preference is stored in a cookie.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">

        <button
          type="button"
          onClick={() => changeTheme("light")}
          className={`rounded-xl border-2 p-6 text-left transition ${
            theme === "light"
              ? "border-blue-600 bg-blue-50"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="text-3xl">
            ☀
          </div>

          <h3 className="mt-3 text-lg font-bold">
            Light Mode
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Bright background with dark text.
          </p>

          {theme === "light" && (
            <p className="mt-4 font-semibold text-blue-700">
              Selected
            </p>
          )}
        </button>

        <button
          type="button"
          onClick={() => changeTheme("dark")}
          className={`rounded-xl border-2 p-6 text-left transition ${
            theme === "dark"
              ? "border-blue-500 bg-slate-900 text-white"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="text-3xl">
            ☾
          </div>

          <h3 className="mt-3 text-lg font-bold">
            Dark Mode
          </h3>

          <p
            className={`mt-1 text-sm ${
              theme === "dark"
                ? "text-slate-300"
                : "text-slate-600"
            }`}
          >
            Dark background designed for lower-light environments.
          </p>

          {theme === "dark" && (
            <p className="mt-4 font-semibold text-blue-300">
              Selected
            </p>
          )}
        </button>

      </div>

      <div className="mt-8 rounded-lg bg-slate-50 p-4">

        <p className="font-semibold">
          Current theme
        </p>

        <p className="mt-1 capitalize text-slate-600">
          {theme} mode
        </p>

      </div>

    </div>
  );
}