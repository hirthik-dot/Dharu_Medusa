# SorryDharu 🌸

A romantic digital bouquet sender built with Next.js 14 App Router and Tailwind CSS.

## Features

- Home page with pastel romantic theme and falling petals animation
- Bouquet builder (`/bouquet?mode=color|mono`) with:
  - 12 flower options
  - max 10 flowers
  - message up to 200 chars
  - live bouquet preview layered with bush and bush-top overlays
- Shareable bouquet via URL — no database required
- Beautiful `/view` page to receive bouquets with romantic card and animations

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Deploy

```bash
vercel deploy
```

For production:

```bash
vercel --prod
```

No environment variables or database setup needed — everything is encoded in the URL.
