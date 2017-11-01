import Component, { tracked } from '@glimmer/component'
import createBrowserHistory from 'history/createBrowserHistory'

import RouterRedux from '../RouterRedux/component'

/**
 * RouterReduxBrowser
 *
 * @class RouterReduxBrowser
 * @extends RouterRedux
**/
export default class RouterReduxBrowser extends RouterRedux {
  args: {
    store,
    basename: string,
    forceRefresh; boolean,
    keyLength: number,
    getUserConfirmation: (message, callback) => void
  }

  /**
   * @inheritDoc
  **/
  createHistory() {
    const {
      basename = "/",
      forceRefresh = false,
      keyLength = 6,
      getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = this.args

    return createBrowserHistory({ basename, forceRefresh, keyLength, getUserConfirmation })
  }
}
