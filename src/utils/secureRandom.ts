const BASE36_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz'

function assertLength(length: number): void {
  if (!Number.isSafeInteger(length) || length < 0) {
    throw new RangeError('Length must be a non-negative safe integer.')
  }
}

export function randomHex(bytes: number): string {
  assertLength(bytes)

  const values = crypto.getRandomValues(new Uint8Array(bytes))
  return Array.from(values, (value) => value.toString(16).padStart(2, '0')).join('')
}

export function randomBase36(len: number): string {
  assertLength(len)

  let result = ''
  while (result.length < len) {
    const remaining = len - result.length
    const values = crypto.getRandomValues(new Uint8Array(Math.min(65_536, Math.max(remaining, 16))))
    for (const value of values) {
      if (value >= 252) continue
      result += BASE36_ALPHABET[value % BASE36_ALPHABET.length]
      if (result.length === len) break
    }
  }

  return result
}
