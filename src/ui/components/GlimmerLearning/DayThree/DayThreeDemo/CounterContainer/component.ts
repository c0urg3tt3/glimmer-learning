import { tracked } from '@glimmer/component'

import { initialState } from './-utils/reducer'
import { increment, decrement, clearCounter } from './-utils/actions'

import BaseContainer from '../../../../BaseContainer/component'

export default class CounterContainer extends BaseContainer {
  @tracked('state')
  get counter() {
    return this.state
  }

  mapStateToLocaleState(state) {
    return state.counter
  }

  mapDispatchToActions() {
    return {
      increment,
      decrement,
      clearCounter
    }
  }
}
