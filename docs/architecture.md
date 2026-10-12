# System Architecture

Starlight is a Next.js 16 (App Router) site for discovering movies and TV shows. All data comes from
[TMDB](https://www.themoviedb.org/); there is no database or user account system.

## Tech stack

| Concern   | Choice                                                            |
| --------- | ----------------------------------------------------------------- |
| Framework | Next.js 16 App Router, React 19, TypeScript, `typedRoutes`        |
| Styling   | Tailwind CSS v4 (theme tokens in `src/app/globals.css`)           |
| Data      | TMDB REST API, called server-side only                            |
| Icons     | `lucide-react` (UI), `react-icons` (genre icons)                  |
| Quality   | ESLint (incl. React Hooks rules), Prettier, `tsc` — all run in CI |

## Directory layout

```
src/
  app/                 Routes (App Router)
    (root)/            Pages that share the navbar/footer layout
      page.tsx         Home: hero carousel + rows
      movie/, tv/      Browse pages + [slug] detail pages
      genre/           Genre index + genre/[genreName]
      discover/        Search
      not-found.tsx    404 for notFound() inside pages
    not-found.tsx      404 for unknown URLs (adds the shell itself)
    sitemap.ts, sitemap/, robots.ts   SEO
  components/
    Layout/            SiteShell, NavBar, Footer, PageHeader
    Media/             Carousel, RowSlider, MovieGrid, browse pages, details page
    Cards/             MediaCard2 (hover-preview card), SearchCard (search dropdown)
    Genre/, Discover/  Page-specific pieces
    ui/                Small shared primitives (SearchBox, SegmentedLinks, buttonStyles)
    Skeletons/         Loading placeholders matching each layout
  hooks/               Client behaviour (swipe, paging, load more, hover preview, nav)
  utils/               Data access, formatting and pure helpers
  constants/           Routes, nav links, breakpoints, sort options
types/                 Shared TypeScript types (TMDB shapes, YouTube player API)
```

Imports use the `@/` alias (`@/components/...`, `@/utils/...`, `@/types/...`).

## Rendering

- **Server Components by default.** Pages fetch from TMDB on the server and pass plain data to the
  few client components that need interactivity (`'use client'` at the top of the file).
- **Filters live in the URL.** `/movie?genre=28&sort=top_rated`, `/genre/drama?type=tv` and
  `/discover?search=…` are read from `searchParams`, so filtered views are shareable and work with
  back/forward. These pages therefore render per request; TMDB responses are still cached (below).
- **Streaming.** Slow sections (cast, recommendations, filtered grids) sit in `<Suspense>` with
  skeletons, and each detail/genre route has a `loading.tsx`.
- **404s.** `app/not-found.tsx` wraps `NotFoundContent` in `SiteShell` (unknown URLs render outside
  the `(root)` layout); `app/(root)/not-found.tsx` renders it bare, since the layout already adds
  the shell.

## Data layer

```
page / server component ──► api.*  (src/utils/api.ts) ──► fetchData (src/utils/fetchData.ts) ──► TMDB
client component ──► server action (src/utils/serverActions/*) ──► api.*
```

- **`fetchData`** is `server-only`: it holds the TMDB key, builds the URL and applies a cache policy.
  The key must never be exposed to the client.
- **`api`** groups the calls the app needs (`media.getMedia`, `getGenreMedia`, `search`,
  `getTrendingAll`, `genre.getAllGenres`, …) and normalises results (e.g. tagging `media_type`).
- **Server actions** (`getMoreMediaAction`, `fetchGenreMedia`, `searchMediaAction`, `getVideoKey`)
  are public HTTP endpoints. They validate every argument with `serverActions/validate.ts` before
  calling `api`.
- **Caching** uses Next's fetch cache: lists 1 hour, details/genres 1 day, TV season counts 7 days.
- **Sorting across movies + TV** (genre pages): ratings and dates are merged directly; popularity
  is not comparable between the two, so "Popular" alternates the lists (`utils/interleave.ts`).

## UI building blocks

- **Layout:** `SiteShell` (navbar + main + footer), `PageHeader` (title + tagline + glow) and the
  `.page-gutter` utility (16 / 24 / 68 / 101 px) keep every page on the same edges.
- **Design tokens** (`globals.css` `@theme`): `primary`, `primary-hover`, `secondary`, `card-bg`,
  `card-stroke`, `panel`, `rating`, `accent-soft`. Prefer these over raw hex values.
- **Buttons:** `buttonClass(variant, size)` in `components/ui/buttonStyles.ts`.
- **Sizing:** the root font size is 62.5% (1rem = 10px), so Tailwind's default text/spacing scale
  is small. Components use explicit pixel values (`text-[15px]`, `gap-[16px]`).

## Key behaviours

| Feature               | Where                                        | Notes                                                                                |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------ |
| Hero carousel         | `Media/Carousel/*`                           | Endless loop, swipe/drag via `useSwipe`, responsive TMDB `srcset`                    |
| Row sliders           | `Media/RowSlider/*`                          | Page-at-a-time; arrows + swipe/drag (`SwipeTrack` + `useSwipe`), rubber-band at ends |
| Grids + "Load more"   | `MovieGrid`, `useLoadMore`, `completeRows`   | Column count from `CAROUSEL_BREAKPOINTS`; only whole rows while more can load        |
| Hover trailer preview | `MediaCard2` + `useHoverPreview`             | Mouse only; slot height is pinned while enlarged so the layout never jumps           |
| Trailer player        | `MediaVideoPlayer`                           | YouTube IFrame API (typed in `types/youtube.ts`); hidden until frames advance        |
| Search dropdown       | `SearchBox` + `SearchCard`                   | ARIA combobox: ↑/↓/Enter/Escape; `/` focuses the navbar search                       |
| Mobile navigation     | `NavBar`, `MobileOverlays`, `useNavBarLogic` | Slide-in drawer, scroll lock, focus return                                           |

## Quality checks

Run before pushing (CI runs the same on pull requests):

```bash
npm run lint
npm run prettier:check
npm run type-check
npm run build
```
