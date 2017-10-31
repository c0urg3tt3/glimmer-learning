import { tracked } from '@glimmer/component'

import { initialState } from './-utils/reducer'
import { toggleBurgerMenu } from './-utils/actions'

import BaseContainer from '../../base-container/component'

export default class DemoContainer extends BaseContainer {
  args: {
    store
  }

  @tracked state = initialState

  @tracked('state')
  get hasBurgerMenu() {
    return this.state.hasBurgerMenu
  }

  @tracked('hasBurgerMenu')
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


};
