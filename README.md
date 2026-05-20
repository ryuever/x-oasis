<p align="center">
  <img src="./website/src/public/x-oasis-icon.svg" alt="x-oasis logo" width="112" />
</p>

<h1 align="center">x-oasis</h1>

<p align="center">
  A modular JavaScript/TypeScript utility toolkit for safer, faster, and cleaner application development.
</p>

<p align="center">
  <strong>72 packages</strong> across <strong>17 categories</strong>, covering type validation, events, streams, diffing, comparison, throttling, functional data workflows, and more.
</p>

## Overview

x-oasis is a monorepo of focused utility packages. Each package is small,
typed, and designed to solve one practical problem well, so applications can
depend on only the pieces they need.

The project also includes a skill-oriented documentation system that maps
common engineering problems to the right utilities and usage patterns.

## Install

Install packages individually:

```bash
pnpm add @x-oasis/is-empty
pnpm add @x-oasis/debounce
pnpm add @x-oasis/emitter
```

Use them directly in JavaScript or TypeScript:

```ts
import { isEmpty } from '@x-oasis/is-empty';
import { debounce } from '@x-oasis/debounce';

if (isEmpty(value)) {
  // Handle empty input before doing expensive work.
}

const search = debounce(async (query: string) => {
  return api.search(query);
}, 300);
```

## What Is Inside

- Assertion utilities for defensive type and value checks
- Scheduling utilities such as debounce, throttle, and batching
- Event primitives for emitters, subscriptions, and disposal
- Stream helpers for async data flows
- Diff and change-detection utilities
- Comparison helpers for shallow equality, clamping, and change resolution
- Functional helpers for grouping, cloning, omission, iteration, and lookup
- DOM, Promise, struct, proto, CSS, error, IoC, and misc utilities

## Skill Guides

The `skills/` directory organizes documentation by problem domain rather than
by package:

- Type validation
- Request throttling
- Event management
- Stream processing
- Change detection
- Object comparison
- Functional programming

Start with [skills/SKILLS_INDEX.md](./skills/SKILLS_INDEX.md) when you know the
problem you want to solve but not the exact package to use.

## Docs

Package documentation lives next to each package under:

```text
packages/{category}/{package}/docs/
```

The website aggregates those docs through the VitePress site in `website/`.

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
```

## Development

```bash
pnpm install
pnpm build
pnpm test
```

## Publishing

```bash
npm run version
```

## License

ISC
