import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate } from '../../app/utils/format'

describe('format helpers', () => {
  it('formats CNY values without fractional digits', () => {
    expect(formatCurrency(1299)).toBe('¥1,299')
  })

  it('formats ISO dates for Chinese readers', () => {
    expect(formatDate('2026-07-10')).toContain('2026年7月10日')
  })
})
