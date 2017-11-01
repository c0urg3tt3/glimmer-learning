import Component, { tracked } from '@glimmer/component'
import createBrowserHistory from 'history/createBrowserHistory'

import Router from '../Router/component'

/**
 * RouterBrowser
 *
 * @class RouterBrowser
 * @extends Router
**/
export default class RouterBrowser extends Router {
  args: {
    basename: string,
    forceRefresh: boolean,
    keyLength: number,
    getUserConfirmation: (mesage: string, callback: Function) => boolean
  }

  /**
   * @inheritDoc
  **/
  @tracked path = "/"

  /**
   * @inheritDoc
  **/
  createHistory() {
    const {
      basename = "/",
      forceRefresh = false,
      keyLength = 6,
      getUserConfirmation = (message: string, callback: Function): boolean => callback(window.confirm(message))
    } = this.args

    this.path = basename

    return createBrowserHistory({ basename, forceRefresh, keyLength, getUserConfirmation })
  }
}
