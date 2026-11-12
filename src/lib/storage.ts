import type { RoiInput, UsageInput } from '../engine/types'

const PRICE_OVERRIDES_KEY = 'priceOverrides'
const SCENARIOS_KEY = 'scenarios'

export interface PriceOverride {
  inputPricePer1M: number
  outputPricePer1M: number
}

export interface SavedScenario {
  id: string
  name: string
  description: string
  createdAt: string
  usage: UsageInput
  selectedModel: string
  comparisonModels: string[]
  roi?: RoiInput
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = globalThis.localStorage?.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJson<T>(key: string, value: T): boolean {
  try {
    if (!globalThis.localStorage) return false
    globalThis.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function getPriceOverrides(): Record<string, PriceOverride> {
  return readJson(PRICE_OVERRIDES_KEY, {})
}

export function savePriceOverrides(overrides: Record<string, PriceOverride>): boolean {
  return writeJson(PRICE_OVERRIDES_KEY, overrides)
}

export function resetPriceOverrides(): boolean {
  try {
    globalThis.localStorage?.removeItem(PRICE_OVERRIDES_KEY)
    return true
  } catch {
    return false
  }
}

export function getScenarios(): SavedScenario[] {
  return readJson(SCENARIOS_KEY, [])
}

export function saveScenarios(scenarios: SavedScenario[]): boolean {
  return writeJson(SCENARIOS_KEY, scenarios)
}
