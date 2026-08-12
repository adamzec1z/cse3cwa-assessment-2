"use client";

import { useEffect } from "react";

export default function ThemeController() {
  useEffect(() => {
    const themeCookie = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith("theme="));

    const savedTheme = themeCookie
      ? themeCookie.split("=")[1]
      : "light";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);

  return null;
}