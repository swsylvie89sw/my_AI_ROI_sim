# AI ROI Simulator

A lightweight web app that helps **AI consultants estimate AI implementation costs and evaluate the financial returns of AI projects before presenting proposals to clients.**

This repository is a 24-hour MVP. It runs entirely in the browser: no backend, no login and no database server.

> **Status:** in development. Project scaffold, shared types and the model price data are in place. The P1 cost estimator has a tested prototype (see [`docs/p1-prototype.html`](docs/p1-prototype.html)), and the production version is being built next.

## MVP scope

Build order is strict: **P1 first, then P2.** The full list of features that are in scope is in [`scope.md`](scope.md). Anything not listed there waits until after the demo.

### P1: AI cost estimation (highest priority)
- Define an AI use case (name and description)
- Pick a provider and model from an editable price table
- Enter monthly users, interactions per user, and average input and output tokens
- See monthly and annual AI API cost, plus the input/output token and cost breakdown
- Compare 2 to 4 models on the same usage
- Edit prices manually, reset to defaults, and choose a display currency with a manual exchange rate

### P2: AI ROI and TCO calculator (after P1 works)
- One-time implementation cost, monthly infrastructure and maintenance
- AI operating cost reused from P1
- Current manual labor cost and expected productivity improvement
- Total cost of ownership, annual benefit, net benefit, ROI % and payback period

### Out of scope for the MVP
Authentication, payments, admin dashboard, live pricing feeds, sharing links, analytics, mobile app and enterprise integrations.

## How the P1 numbers are calculated

```
monthly interactions = monthly users × interactions per user
monthly input tokens = monthly interactions × avg input tokens
monthly output tokens = monthly interactions × avg output tokens
input cost  = monthly input tokens  / 1,000,000 × input price per 1M
output cost = monthly output tokens / 1,000,000 × output price per 1M
monthly AI cost = input cost + output cost
annual AI cost  = monthly AI cost × 12
```

When a non-USD display currency is selected, prices (kept in USD) are multiplied by a manually entered exchange rate. Values are rounded for display only, never inside calculations.

All math lives in pure functions under `src/engine/`, so it can be unit tested. The UI contains no formulas.

## Tech stack

| Layer | Choice |
|---|---|
| Frontend | Vite, React, TypeScript |
| Styling | Tailwind CSS |
| Tests | Vitest |
| Persistence | Browser `localStorage` (price overrides and saved scenarios) |
| Pricing data | `src/data/models.json` |
| Hosting | Vercel (free tier), deployed from this repository |

## Project structure

```
.
├── docs/
│   └── p1-prototype.html     # single-file P1 prototype used for early testing
├── src/
│   ├── engine/
│   │   ├── types.ts          # shared types
│   │   ├── costEngine.ts     # P1 math (pure functions)
│   │   └── roiEngine.ts      # P2 math (pure functions)
│   ├── data/
│   │   └── models.json       # default model prices
│   ├── lib/
│   │   └── storage.ts        # localStorage helpers
│   ├── components/
│   └── pages/
├── scope.md                  # P1 MUST HAVE scope
└── README.md
```

Files such as `costEngine.ts` and `roiEngine.ts` are added as the build progresses.

## Getting started

Requires Node.js (LTS).

```bash
git clone https://github.com/<your-username>/ai-roi-simulator.git
cd ai-roi-simulator
npm install
npm run dev
```

| Command | What it does |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm test` | Run the unit tests |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Serve the production build locally |

## Model price data

`src/data/models.json` holds one row per model:

| Field | Meaning |
|---|---|
| `provider` | Provider name |
| `model` | Model name |
| `inputPricePer1M` | Input price per 1M tokens, in USD |
| `outputPricePer1M` | Output price per 1M tokens, in USD |
| `priceAsOf` | Date the price was copied |
| `source` | URL of the official pricing page |

Prices change. Copy them from each provider's official pricing page, record the date and source, and refresh them before using the tool for a real proposal.

## Deployment

1. Push this repository to GitHub.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Every later push to `main` redeploys automatically.

The app is a static site, so no environment variables or server are needed.

## Roadmap

1. Scaffold, types and price data
2. P1 cost engine with unit tests
3. P1 interface
4. P2 ROI and TCO engine with unit tests
5. P2 interface and the P1 to P2 hand-off
6. Scenario saving, responsive layout and polish
7. Testing, production deploy and demo preparation

## Disclaimer

This tool produces estimates from user-supplied assumptions and user-maintained prices. It is not financial advice, and results are only as good as the inputs.
