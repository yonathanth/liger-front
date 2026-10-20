# Liger Gym — website & admin

Public website and web admin panel for Liger Gym. Next.js 16 + Tailwind 4.
Data comes from `liger-gym-api`, which the desktop app syncs to.

## Setup

```bash
npm install
cp .env.example .env.local   # point NEXT_PUBLIC_API_URL at the API
npm run dev                  # http://localhost:3018
```

`NEXT_PUBLIC_API_URL` is read at **build** time, so on the server it must be in
`.env.local` before `npm run build`.

## Where things live

| What | File |
| --- | --- |
| Name, domain, address, map, phone, hours, social links | `lib/site.ts` |
| About text, values, "Our Staff" | `lib/content.ts` |
| FAQ questions and answers | `lib/faq-content.ts` |
| Colours (primary `#9DA902` on black) | `app/globals.css` (`@theme`) |
| Photos | `public/images/` |
| Logo, favicons, social image | `public/logo.png`, `public/favicon/`, `public/og-image.png` |

**Plans, add-ons and classes are not in the code.** They come from the desktop app
through `GET /api/site/catalog` and refresh within a minute of a sync. Edit prices
and the timetable in the desktop app.

## Replacing placeholders

- **Photos:** overwrite the files in `public/images/` keeping their names
  (`hero.jpg`, `page-hero.jpg`, `facility-1..4.jpg`, `story.jpg`, `staff-1..4.jpg`).
  Regenerate the labelled placeholders with `python scripts/brand_assets.py placeholders`.
- **Logo:** save it as `public/logo-source.png` (transparent PNG, square-ish), then
  `python scripts/brand_assets.py icons`. This rebuilds `logo.png`, every favicon,
  the PWA icons and `og-image.png`. Needs `pip install pillow`.
- **Text:** search for `TODO` in `lib/`.

## Deploy

Pushing to `master` runs `.github/workflows/main.yml`: pull, build, and (re)start the
`liger-gym-app` PM2 process on the VPS (`npm start`, port 3020). Repository secrets:
`HOST`, `USERNAME`, `PRIVATE_KEY`, `SSH_PORT`. Point the domain's reverse proxy at
port 3020.
