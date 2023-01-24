export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export function randomNumberBetween(min: number, max: number): number {
  min = Math.ceil(min)
  return Math.floor(Math.random() * (Math.floor(max) - min + 1) + min)
}
