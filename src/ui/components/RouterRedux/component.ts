import { tracked } from '@glimmer/component'
import { assert } from '@glimmer/debug'
import { bindActionCreators } from 'redux'
import routerActions from './-utils/actions'
import Router from '../router/component'

/**
 * RouterRedux
 *
 * @class RouterRedux
 * @extends Router
**/
export default class RouterRedux extends Router {
  args: {
    store
  }

  constructor(options) {
    // don't forget to call the parent constructor
    super(options)
    // retrieve the store from args
    const store = this.args.store
    assert(store, `a 'store' argument must be provided for '${this.debugName}' component | <${this.debugName} @store={{store}} as |...|>`)
    // set the unsubscribe method to remove store listener when cmponent is destroyed
    this.__unsubscribe = store.subscribe(() => {
      // retrieve the updated state and set it to the locale state
      const state = this.args.store.getState()

      const pathname = state.history.location.pathname

      if (pathname !== this.pathname) {
        const method = state.history.method
        this.history[method](pathname)
      }
    })
    // map the dispatchable actions to class properties
    const actions: any = bindActionCreators(routerActions, store.dispatch)

    /**
     * the Object is displayed in class properties (enumerable true)
     * the Object can't be modified or deleted (configurable false (default))
     *
     * @see https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/defineProperty
    **/
    Object.keys(actions).forEach(action => {
      Object.defineProperty(this, action, {
        enumerable: true,
        set: () => {},
        get: () => actions[action]
      })
    })

    // window.onpopstate = (event: PopStateEvent) => {
    //   console.log('pop', event, this.history)
    // }
  }
}
