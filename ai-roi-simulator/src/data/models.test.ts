import { describe, expect, it } from 'vitest'
import models from './models.json'

const requiredFields = [
  'provider',
  'model',
  'inputPricePer1M',
  'outputPricePer1M',
  'priceAsOf',
  'source',
] as const

describe('models.json', () => {
  it('includes all required fields and non-negative numeric prices for every model', () => {
    expect(models.length).toBeGreaterThan(0)

    for (const model of models) {
      for (const field of requiredFields) {
        expect(model).toHaveProperty(field)
        expect(model[field]).not.toBe('')
        expect(model[field]).not.toBeNull()
      }

      expect(typeof model.inputPricePer1M).toBe('number')
      expect(model.inputPricePer1M).toBeGreaterThanOrEqual(0)
      expect(typeof model.outputPricePer1M).toBe('number')
      expect(model.outputPricePer1M).toBeGreaterThanOrEqual(0)
    }
  })

  it('has unique provider and model pairs', () => {
    const keys = models.map(({ provider, model }) => `${provider}\u0000${model}`)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
