import { randomId } from './random-id'

describe('@alola/hooks/random-id', () => {
  it('returns random id with alola- prefix', () => {
    expect(randomId().includes('alola-')).toBe(true)
    expect(randomId()).toHaveLength(17)
  })
})
