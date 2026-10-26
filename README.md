# @djmiskey/lab-tokens

The shared look of the [djmiskey.com](https://djmiskey.com) labs: neutral colour tokens, light and dark mode, fluid type, element defaults, and a System / Light / Dark switch whose choice carries across every `*.djmiskey.com` lab.

Each lab keeps its own **accent** colour, so they look like one family but are still easy to tell apart.

## Use it in a Next.js + Tailwind v4 lab

```sh
npm i github:DamianMiskey/lab-tokens#v1.0.0
```

```ts
// next.config.ts: the package ships TypeScript source
transpilePackages: ["@djmiskey/lab-tokens"],
```

```css
/* globals.css */
@import "tailwindcss";
@import "@djmiskey/lab-tokens/tailwind.css";

:root {
  --lab-accent: #b45309;
  --lab-accent-ink: #92400e;
  --lab-accent-ink-dark: #fbbf24;
}
```

```tsx
// layout.tsx
import { THEME_SCRIPT } from "@djmiskey/lab-tokens/theme";
import { ThemeSwitch } from "@djmiskey/lab-tokens/ThemeSwitch";

<html lang="en" suppressHydrationWarning>
  <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
  …put <ThemeSwitch /> in the navigation…
```

## Without Tailwind

Import `tokens.css` for the custom properties (`var(--surface)`, `var(--accent)`…), and inline `THEME_SCRIPT` the same way.

## Changing the look

Edit here, tag a new version (`v1.1.0`), and bump the tag in each lab. The tokens are demonstrated at [djmiskey.com/tailwind/theme](https://djmiskey.com/tailwind/theme).
