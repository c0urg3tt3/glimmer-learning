import Component from '@glimmer/component'

export default class BurgerButton extends Component {
  args: {
    clickAction: (event) => void
  }
}
