export function randomId() {
  return `alola-${Math.random().toString(36).slice(2, 11)}`
}
