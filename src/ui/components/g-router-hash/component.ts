import Component, { tracked } from '@glimmer/component';
import createHashHistory from 'history/createHashHistory'

import GRouter from '../g-router/component'

/**
 * GRouterHash
 *
 * @class GRouterHash
 * @extends GRouter
**/
export default class GRouterHash extends GRouter {
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
