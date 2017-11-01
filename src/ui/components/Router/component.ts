import Component, { tracked } from '@glimmer/component'
import { assert } from '@glimmer/debug'

/**
 * Router
 *
 * @class Router
 * @extends @glimmer/component
**/
export default class Router extends Component {
  /**
   * @inheritDoc
  **/
  constructor(options) {
    // don't forget to call the parent constructor
    super(options)
    // call the createHistory hook to customize history
    const history = this.createHistory()
    // inform user when history is missing
    assert(history, `'history' provided by 'createHistory' hook is falsy in '${this.debugName}' component`)
    // manage history event
    this.listenHistory = this.listenHistory.bind(this)
    this._unlistenHistory = history.listen(this.listenHistory)
    // update history
    this.history = history
  }

  /**
   * @property {String} pathname - the current location pathname
  **/
  @tracked pathname = "/"

  /**
   * @property {Object} history - the navigation history
  **/
  history: any = this.createHistory()

  /**
   * hook that allow to customize the history type
   * - browser
   * - hash
   * - memory
   *
   * @method createHistory
   * @return {void}
  **/
  createHistory(): any {
    // inform user when createHistory hook is missing
    assert(false, `you must provide a 'createHistory' hook in '${this.debugName}' component`)
  }

  listenHistory(location, action) {
    // update the tracked pathname
    this.pathname = location.pathname
  }

  /**
   * set on construct, allow to remove history listener
   *
   * @method _unlistenHistory
   * @return {void}
  **/
  _unlistenHistory: Function = null

  /**
   * @inheritDoc
  **/
  willDestroy() {
    // check for history unlisten function
    if (this._unlistenHistory) {
      // remove history event istener
      this._unlistenHistory()
      // reset unlisten to null
      this._unlistenHistory = null
    }
  }
}
