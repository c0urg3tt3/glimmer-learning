import Component, { tracked } from '@glimmer/component'
import configureStore from './-utils/configureStore'

export default class StoreProvider extends Component {
  store

  constructor(options) {
    super(options)
    
    this.store = configureStore()
  }
}
