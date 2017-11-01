import Component, { tracked } from '@glimmer/component';
import createHashHistory from 'history/createHashHistory'

import Router from '../Router/component'

/**
 * RouterHash
 *
 * @class RouterHash
 * @extends Router
**/
export default class RouterHash extends Router {
  /**
   * @inheritDoc
  **/
  @tracked pathname = "/"

  /**
   * @inheritDoc
  **/
  createHistory() {
    const {
      basename = "",
      hashType = "noslash",
      getUserConfirmation = (message, callback) => callback(window.confirm(message))
    } = this.args

    return createHashHistory({ basename, hashType, getUserConfirmation })
  }
}
