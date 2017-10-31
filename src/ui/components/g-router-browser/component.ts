import Component, { tracked } from '@glimmer/component'
import createBrowserHistory from 'history/createBrowserHistory'

import GRouter from '../g-router/component'

/**
 * GRouterBrowser
 *
 * @class GRouterBrowser
 * @extends GRouter
**/
export default class GRouterBrowser extends GRouter {
  /**
   * @inheritDoc
  **/
  @tracked pathname = "/"

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
