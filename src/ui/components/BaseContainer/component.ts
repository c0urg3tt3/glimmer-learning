import Component, { tracked } from '@glimmer/component'
import { assert } from '@glimmer/debug'
import { bindActionCreators } from 'redux'

/**
 * ReduxContainer is a smart component.
 *
 * ReduxContainer will bind dispatchable actions to class.
 *
 * ReduxContainer allow to listen to change in store, when triggered
 * will set a locale state depending of global state
 *
 * @class ReduxContainer
 * @extends Component
**/
export default class BaseContainer extends Component {
  /**
   * @property {Object} state the tracked locale state
  **/
  @tracked state = {}

  /**
   * @constructor
  **/
  constructor(options) {
    super(options)
    // retrieve the store from args
    const store = this.args.store
    assert(store, `a 'store' argument must be provided for '${this.debugName}' component | <${this.debugName} @store={{store}} as |...|>`)
    // initialize locale state
    this.state = this.mapStateToLocaleState(store.getState())
    // set the unsubscribe method to remove store listener when cmponent is destroyed
    this.__unsubscribe = store.subscribe(() => {
      // retrieve the updated state and set it to the locale state
      this.state = this.mapStateToLocaleState(this.args.store.getState())
    })
    // map the dispatchable actions to class properties
    const actions: any = bindActionCreators(this.mapDispatchToActions(), store.dispatch)

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
  }

  /**
   * mapStateToLocaleState
   *
   * define the shape of the locale state.
   *
   * overwrite this method to custmize your locale state shape.
   * this method is invoked each time the store change.
   *
   * @param {Object} state the globale state
   * @return {Object} the locale state
  **/
  mapStateToLocaleState(state): Object {
    return state
  }

  /**
   * mapDispatchToActions
   *
   * overwrite this method to add dispatchable actions.
   * this method is invoked once on construct.
   *
   * @return {Object} a list of dispatchable actions
  **/
  mapDispatchToActions(): any {
    // return {
    //  someActionCreator,
    //  renamedActionCreator: ambigousNameActionCreator
    // }
    return {}
  }

  /**
   * __unsubscribe
   *
   * unsubscribe from the store change Event
   *
   * this method is set on construct in response of store subscribe.
   * automatically called on component destroy.
   *
   * @private
   * @return {void}
  **/
  private __unsubscribe = null

  /**
   * willDestroy
   *
   * @see @glimmer/component lifecycle
   * @return {void}
  **/
  willDestroy() {
    if (this.__unsubscribe) {
      this.__unsubscribe()
      this.__unsubscribe = null
    }
  }
};
