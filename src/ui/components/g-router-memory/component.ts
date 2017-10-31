import Component, { tracked } from '@glimmer/component';
import createMemoryHistory from 'history/createMemoryHistory'

import GRouter from '../g-router/component'

/**
 * GRouterMemory
 *
 * @class GRouterMemory
 * @extends GRouter
**/
export default class GRouterMemory extends GRouter {
  /**
   * @inheritDoc
  **/
  @tracked pathname = "/"

  /**
   * @inheritDoc
  **/
  createHistory() {
    const {
      initialEntries = ["/"],
      initialIndex = 0,
      keyLength = 6,
      getUserConfirmation = null
    } = this.args

    return createMemoryHistory({ initialEntries, initialIndex, keyLength, getUserConfirmation })
  }
}
