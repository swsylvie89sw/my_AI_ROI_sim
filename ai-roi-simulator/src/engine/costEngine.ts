import type { CostEstimate, ModelComparison, ModelPrice, UsageInput } from './types'

const PRICE_DIVISOR = 1_000_000

function assertNonNegativeFinite(values: number[], label: string): void {
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError(`${label} values must be finite, non-negative numbers.`)
  }
}

export function estimateCost(usage: UsageInput, price: Pick<ModelPrice, 'inputPricePer1M' | 'outputPricePer1M'>): CostEstimate {
  assertNonNegativeFinite(Object.values(usage), 'Usage')
  assertNonNegativeFinite([price.inputPricePer1M, price.outputPricePer1M], 'Price')

  const monthlyInteractions = usage.monthlyUsers * usage.interactionsPerUser
  const monthlyInputTokens = monthlyInteractions * usage.avgInputTokens
  const monthlyOutputTokens = monthlyInteractions * usage.avgOutputTokens
  const inputCostMonthly = (monthlyInputTokens / PRICE_DIVISOR) * price.inputPricePer1M
  const outputCostMonthly = (monthlyOutputTokens / PRICE_DIVISOR) * price.outputPricePer1M
  const baseMonthlyCost = inputCostMonthly + outputCostMonthly
  const bufferCostMonthly = baseMonthlyCost * (usage.bufferPct / 100)
  const monthlyCost = baseMonthlyCost + bufferCostMonthly

  return {
    monthlyInteractions,
    monthlyInputTokens,
    monthlyOutputTokens,
    inputCostMonthly,
    outputCostMonthly,
    bufferCostMonthly,
    monthlyCost,
    annualCost: monthlyCost * 12,
  }
}

export function compareModels(usage: UsageInput, models: ModelPrice[]): ModelComparison[] {
  if (models.length < 2 || models.length > 4) {
    throw new RangeError('Choose between 2 and 4 models to compare.')
  }

  const estimates = models.map((model) => ({
    provider: model.provider,
    model: model.model,
    ...estimateCost(usage, model),
  }))
  const cheapest = Math.min(...estimates.map(({ monthlyCost }) => monthlyCost))

  return estimates.map((estimate) => ({
    ...estimate,
    differenceVsCheapest: cheapest === 0 ? null : (estimate.monthlyCost - cheapest) / cheapest,
  }))
}
