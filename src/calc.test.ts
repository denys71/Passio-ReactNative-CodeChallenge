import { calc } from "./calc"
import { FT2M } from "./const"

test('testing calculaing ft to meters', () => {
  expect(calc(1, false, FT2M)).toBe('0.3048')
})