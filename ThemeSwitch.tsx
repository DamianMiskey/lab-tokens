"use client";

import { useEffect, useSyncExternalStore } from "react";
import { applyChoice, storeChoice, type ThemeChoice } from "./theme";

const CHOICES: { id: ThemeChoice; label: string }[] = [
  { id: "system", label: "System" },
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
];

// The choice lives on <html data-theme-choice>; components read it from
// there (and re-render when it changes) instead of keeping a copy.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme-choice"] });
  return () => observer.disconnect();
}
const current = () => (document.documentElement.dataset.themeChoice as ThemeChoice | undefined) ?? "system";

// System / Light / Dark, for the whole site. Styled by Tailwind classes, or,
// in a lab without Tailwind, by theme-switch.css through the lab-* class names. The inline script in <head>
// already applied the stored choice before the first paint; this stores
// changes and follows the device while "System" is chosen.
export function ThemeSwitch() {
  // null on the server: no button shows as pressed until the page knows.
  const choice = useSyncExternalStore(subscribe, current, () => null);

  useEffect(() => {
    if (choice !== "system") return;
    const media = matchMedia("(prefers-color-scheme: dark)");
    const follow = () => applyChoice("system");
    media.addEventListener("change", follow);
    return () => media.removeEventListener("change", follow);
  }, [choice]);

  const pick = (c: ThemeChoice) => {
    applyChoice(c);
    storeChoice(c);
  };

  return (
    <div className="lab-theme-switch flex w-full gap-1 rounded-lg border border-line p-0.5" role="group" aria-label="Colour theme">
      {CHOICES.map((c) => (
        <button
          key={c.id}
          type="button"
          aria-pressed={choice === c.id}
          onClick={() => pick(c.id)}
          className="lab-theme-switch-option flex-1 cursor-pointer rounded-md px-2 py-1 text-xs text-muted hover:text-fg aria-pressed:bg-accent aria-pressed:font-semibold aria-pressed:text-white"
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
