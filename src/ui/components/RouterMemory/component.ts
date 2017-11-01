import Component, { tracked } from '@glimmer/component';
import createMemoryHistory from 'history/createMemoryHistory'

import Router from '../Router/component'

/**
 * RouterMemory
 *
 * @class RouterMemory
 * @extends Router
**/
export default class RouterMemory extends Router {
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
