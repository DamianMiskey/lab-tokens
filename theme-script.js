// The head script on its own, in plain JavaScript, so build tools that can't
// read TypeScript from node_modules (a Vite config, a Node script) can use it.

export const THEME_KEY = "theme";
export const SHARED_DOMAIN = "djmiskey.com";

/**
 * Runs inline in <head>, before the page is drawn, so the first paint already
 * has the right colours (no flash of the wrong theme). Kept tiny and
 * dependency-free; storage can be blocked, hence the try. Reads the shared
 * cookie first, then this site's localStorage.
 * A site with a strict CSP allows it by hash: sha256 of this exact string.
 */
export const THEME_SCRIPT = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_KEY}=(system|light|dark)/),c=m?m[1]:localStorage.getItem("${THEME_KEY}")||"system",d=c==="dark"||(c==="system"&&matchMedia("(prefers-color-scheme: dark)").matches),e=document.documentElement;e.dataset.theme=d?"dark":"light";e.dataset.themeChoice=c}catch(x){}})()`;
