export const INCREMENT = 'INCREMENT'

export function increment() {
  return {
    type: INCREMENT
  }
}

export const DECREMENT = 'DECREMENT'

export function decrement() {
  return {
    type: DECREMENT
  }
}

export const CLEAR_COUNTER = 'CLEAR_COUNTER'

export function clearCounter() {
  return {
    type: CLEAR_COUNTER
  }
}
