# integryl-website

The public site for Integryl, at integryl.com: a six-page advisory site for financial institutions.

- **Spec and plan:** `integryl-labs/docs`, under `docs/internal-tools/integryl-website/`.
- **Design source:** `design/mockup/` is the approved mockup and the source of record for wording and layout.
- **Stack:** Next.js (App Router), statically rendered, plain CSS, hosted on Vercel.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in the Resend values to test the Engage form
npm run dev
```

## Check

```bash
npm run lint
npm run test   # unit tests (Vitest)
npm run e2e    # builds, then runs Playwright against the production server on port 3100
```

## Where things live

- `content/practices.ts` holds the six practices in their one fixed order. The home grid, Advisory page, footer and Engage form all render from it.
- `content/roles.ts` holds the two fractional roles.
- `content/site.ts` holds navigation, contact details and the Integryl Intelligence URLs.
- `lib/feed.ts` and `lib/latest-edition.ts` read the Beehiiv RSS feed for the home page card.
- `app/api/engage/route.ts` validates Engage form inquiries; `lib/deliver.ts` sends them through Resend, or through the previous site's Formspree form until the Resend settings exist.

Integryl Intelligence itself is published on Beehiiv. This site links to it for reading and subscribing.
