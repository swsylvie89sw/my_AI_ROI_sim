import type { RoiEstimate, RoiInput } from './types'

function assertNonNegativeFinite(values: number[]): void {
  if (values.some((value) => !Number.isFinite(value) || value < 0)) {
    throw new RangeError('ROI inputs must be finite, non-negative numbers.')
  }
}

export function estimateRoi(input: RoiInput): RoiEstimate {
  assertNonNegativeFinite(Object.values(input))

  const initialInvestment = input.oneTimeCost
  const monthlyTco = input.aiOpCostMonthly + input.monthlyInfra + input.monthlyMaintenance
  const annualTco = monthlyTco * 12
  const yearOneTco = initialInvestment + annualTco
  const annualBenefit = input.currentManualCostMonthly * 12 * (input.productivityGainPct / 100)
  const netAnnualBenefit = annualBenefit - annualTco
  const monthlyNetBenefit = annualBenefit / 12 - monthlyTco

  return {
    initialInvestment,
    monthlyTco,
    annualTco,
    yearOneTco,
    annualBenefit,
    netAnnualBenefit,
    yearOneRoiPct: yearOneTco === 0 ? null : ((annualBenefit - yearOneTco) / yearOneTco) * 100,
    runRateRoiPct: annualTco === 0 ? null : (netAnnualBenefit / annualTco) * 100,
    monthlyNetBenefit,
    paybackMonths: monthlyNetBenefit > 0 ? initialInvestment / monthlyNetBenefit : null,
  }
}
