// The theme switch: "system" (follow the device), "light" or "dark".
// <html data-theme> always holds the resolved theme, so CSS only has to look
// at one attribute; <html data-theme-choice> holds the choice.
//
// The choice is kept in a cookie on djmiskey.com, so every lab
// (obs.djmiskey.com, motion.djmiskey.com…) shares it: pick Dark once and they
// all follow. Elsewhere (localhost, *.vercel.app) it falls back to
// localStorage on that site.
export type ThemeChoice = "system" | "light" | "dark";
export const THEME_KEY = "theme";
export const SHARED_DOMAIN = "djmiskey.com";

/**
 * Runs inline in <head>, before the page is drawn, so the first paint already
 * has the right colours (no flash of the wrong theme). Kept tiny and
 * dependency-free; storage can be blocked, hence the try.
 */
export const THEME_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_KEY}=(system|light|dark)/),c=m?m[1]:localStorage.getItem("${THEME_KEY}")||"system",d=c==="dark"||(c==="system"&&matchMedia("(prefers-color-scheme: dark)").matches),e=document.documentElement;e.dataset.theme=d?"dark":"light";e.dataset.themeChoice=c}catch(x){}})()`;

export function resolve(choice: ThemeChoice, systemDark: boolean): "light" | "dark" {
  return choice === "system" ? (systemDark ? "dark" : "light") : choice;
}

/** The cookie that shares a choice across the labs, or null off the shared domain. */
export function themeCookie(choice: ThemeChoice, hostname: string): string | null {
  const shared = hostname === SHARED_DOMAIN || hostname.endsWith(`.${SHARED_DOMAIN}`);
  if (!shared) return null;
  return `${THEME_KEY}=${choice}; Domain=${SHARED_DOMAIN}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`;
}

/** Applies a choice to the page now. */
export function applyChoice(choice: ThemeChoice) {
  const root = document.documentElement;
  root.dataset.theme = resolve(choice, matchMedia("(prefers-color-scheme: dark)").matches);
  root.dataset.themeChoice = choice;
}

/** Remembers a choice: in the shared cookie on djmiskey.com, and in localStorage. */
export function storeChoice(choice: ThemeChoice) {
  const cookie = themeCookie(choice, location.hostname);
  if (cookie) document.cookie = cookie;
  try { localStorage.setItem(THEME_KEY, choice); } catch { /* storage blocked: works for this visit only */ }
}
