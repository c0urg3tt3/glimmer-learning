import { TOGGLE_BURGER_MENU } from './actions'

export const initialState =  {
  hasBurgerMenu: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case TOGGLE_BURGER_MENU:
      setTimeout(() => {
        window.dispatchEvent(new Event("optimizedResize"))
      }, 333)
      return {
        hasBurgerMenu: !state.hasBurgerMenu
      }
    default:
      return state
  }
}
