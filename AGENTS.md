<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Sass styles

`src/app/globals.scss` is the stylesheet entry. It keeps the Tailwind import and pulls in shared partials with `@use`. Do not add component rules there.

Shared styles live in partials under `src/app/styles/`. A partial filename starts with `_`, for example `src/app/styles/_tokens.scss`. From `globals.scss`, import it as `@use "styles/tokens"`. `sassOptions.loadPaths` includes that directory, so any stylesheet can `@use "tokens"` or `@use "motion"`.

Styles for one component live in a CSS module beside that component, for example `src/components/navbar/navbar.module.scss`, imported from `navbar.tsx`. Layout that is already a Tailwind utility stays a utility class on the component.

`next.config.ts` compiles `globals.scss` through Sass and Tailwind. It compiles `*.module.scss` with `sass-loader` and `as: "*.module.css"`. The `*.css` rule must exclude `*.module.css`. That pattern also matches module files, and treating one as plain CSS drops the class-name exports.

## Unused styles

When you add, change, or remove styles, fonts, or theme tokens, also remove the unused ones in the same change. Do this without being asked. Leave styles alone on a task that does not touch them.

Search components, layout, and stylesheets for real references. Remove what nothing uses: `next/font` loads and the CSS variables they set, color and font tokens, Sass variables, `@theme` entries, rules, keyframes, mixins, functions, partials, CSS-module classes, and a stylesheet nothing imports.

A token that is still read stays, including a custom property used only from a module or a raw property. A word in site copy is not a use. Leave Tailwind's own default theme in place.

## Shared motion values

A length, time, or rate used in more than one file is a Sass variable in `src/app/styles/_motion.scss`. A value used by one component stays in that component's module.

`_theme.scss` publishes a shared value as a custom property when a stylesheet or a client component needs it at runtime. JavaScript reads that property. It does not redeclare the number.

Keyframe offsets stay Sass values. A custom property cannot be a keyframe stop. Modules and partials `@use "motion"`. One-off measurements, such as a logo's pixel gap, stay in the component that measures them.

## Linting

`npm run lint` must pass with no errors and no warnings. A change is not done while lint fails. Run it on the files you touched before finishing, and fix what it reports.

Fix the code. Do not silence a rule with a disable comment unless the rule cannot see a real constraint, and then say why in the comment.
