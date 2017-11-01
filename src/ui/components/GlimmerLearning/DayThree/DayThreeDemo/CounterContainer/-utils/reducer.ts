import { INCREMENT, DECREMENT, CLEAR_COUNTER } from './actions'

export const initialState =  0

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case CLEAR_COUNTER:
      return 0
    default:
      return state
  }
}
