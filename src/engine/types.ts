export interface ModelPrice {
  provider: string
  model: string
  inputPricePer1M: number
  outputPricePer1M: number
  priceAsOf: string
  source: string
}

export interface UsageInput {
  monthlyUsers: number
  interactionsPerUser: number
  avgInputTokens: number
  avgOutputTokens: number
  bufferPct: number
}

export interface CostEstimate {
  monthlyInteractions: number
  monthlyInputTokens: number
  monthlyOutputTokens: number
  inputCostMonthly: number
  outputCostMonthly: number
  bufferCostMonthly: number
  monthlyCost: number
  annualCost: number
}

export interface ModelComparison extends CostEstimate {
  provider: string
  model: string
  differenceVsCheapest: number | null
}

export interface RoiInput {
  oneTimeCost: number
  monthlyInfra: number
  monthlyMaintenance: number
  aiOpCostMonthly: number
  currentManualCostMonthly: number
  productivityGainPct: number
}

export interface RoiEstimate {
  initialInvestment: number
  monthlyTco: number
  annualTco: number
  yearOneTco: number
  annualBenefit: number
  netAnnualBenefit: number
  yearOneRoiPct: number | null
  runRateRoiPct: number | null
  monthlyNetBenefit: number
  paybackMonths: number | null
}
