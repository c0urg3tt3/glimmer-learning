import { UPDATE_LOCATION } from './actions'

export const initialState =  {
  location: {
    pathname: "/"
  },
  method: 'push'
}

export default function historyReducer(state = initialState, { type, payload }) {
  switch(type) {
    case UPDATE_LOCATION:
      return {
        location: {
          pathname: payload.pathname
        },
        method: payload.method
      }
    default:
      return state
  }
}
