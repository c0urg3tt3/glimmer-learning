import { tracked } from '@glimmer/component'

import { initialState } from './-utils/reducer'
import { toggleBurgerMenu } from './-utils/actions'

import BaseContainer from '../../BaseContainer/component'

export default class DemoContainer extends BaseContainer {
  args: {
    store
  }

  @tracked state = initialState

  @tracked('state')
  get showMenuClassname() {
    return this.state.hasBurgerMenu ? 'show-menu' : ''
  }

  mapStateToLocaleState(state) {
    return state.demo
  }

  mapDispatchToActions() {
    return {
      toggleBurgerMenu
    }
  }
}
