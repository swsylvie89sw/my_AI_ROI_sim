# SCOPE.md: P1 MUST HAVE (AI Cost Estimation)

> Anything not on this list waits until after the demo.

**MVP proposition:** help AI consultants estimate AI implementation costs and evaluate the financial returns of AI projects before presenting proposals to clients.

**Build rule:** P1 is built and verified before any P2 work starts. All math lives in pure, unit-tested engine functions; the UI contains no formulas.

---

## P1 MUST HAVE features

| # | Feature | Done when |
|---|---|---|
| 1 | **Use case definition** (name required, description optional) | Both appear on the results and summary |
| 2 | **Provider and model selection** from a configurable price table | Changing provider filters the model list |
| 3 | **Usage inputs:** monthly users, interactions per user per month, avg input tokens, avg output tokens | Non-negative numbers only; results update instantly |
| 4 | **Token and cost outputs:** monthly input tokens, monthly output tokens, input cost, output cost, total monthly cost, total annual cost | All six values are shown, with the formula displayed |
| 5 | **Model comparison** (2 to 4 models on identical usage) | Table shows monthly cost, annual cost and % difference vs the cheapest |
| 6 | **Manual price configuration** (edit input/output price per 1M tokens, reset to default) | Editing a price changes every dependent number; edits persist in the browser; table shows an "as of" date |

## P1 expected outputs
- Estimated monthly AI cost
- Estimated annual AI cost
- Input/output token consumption breakdown
- Cost comparison between selected models

## P1 formulas
- Monthly interactions = monthly users x interactions per user
- Monthly input tokens = monthly interactions x avg input tokens
- Monthly output tokens = monthly interactions x avg output tokens
- Input cost = monthly input tokens / 1,000,000 x input price per 1M
- Output cost = monthly output tokens / 1,000,000 x output price per 1M
- Monthly AI cost = input cost + output cost
- Annual AI cost = monthly AI cost x 12
- Difference vs cheapest = (model cost - cheapest cost) / cheapest cost

Round for display only, never inside calculations.

## P1 data fields

**models.json** (one row per model): `provider`, `model`, `inputPricePer1M`, `outputPricePer1M`, `priceAsOf`, `source` (official pricing page URL).

**Usage input:** `monthlyUsers`, `interactionsPerUser`, `avgInputTokens`, `avgOutputTokens`.

**Price overrides** (localStorage): map of `provider/model` to `{ inputPricePer1M, outputPricePer1M }`.

## P1 acceptance checklist
- [ ] A first-time user completes a cost estimation without help
- [ ] At least two models compare correctly with consistent totals
- [ ] Engine outputs match a hand-built spreadsheet for 3 scenarios
- [ ] Zero users, zero tokens and very large volumes produce no NaN or Infinity
- [ ] Price overrides persist after refresh; reset restores defaults

## Not in this file
- **P1 SHOULD HAVE:** safety buffer / overhead %
- **P2 (ROI and TCO calculator):** starts only after P1 is working
- **Out of scope:** AI-assisted intake, live pricing feeds, accounts, payments, admin dashboard, sharing links, analytics, enterprise integrations
