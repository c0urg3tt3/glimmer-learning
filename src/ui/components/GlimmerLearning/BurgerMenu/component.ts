import Component, { tracked } from '@glimmer/component'

export default class BurgerMenu extends Component {
  args: {
    historyPush: () => void,
    toggleBurgerMenu: () => void
  }
}
