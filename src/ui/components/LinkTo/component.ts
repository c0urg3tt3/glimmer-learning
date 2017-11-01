import Component from '@glimmer/component'

/**
 * all credits react-router
**/
function isModifiedEvent({metaKey, altKey, ctrlKey, shiftKey }) {
  return !!(metaKey || altKey || ctrlKey || shiftKey)
}

/**
 * LinkTo
 *
 * @class LinkTo
 * @extends @glimmer/component
**/
export default class LinkTo extends Component {
  args: {
    to: string,
    target?: string,
    historyPush?: (to: string) => void,
    historyReplace?: (to: string) => void,
    historyBlock?: (to: string) => void,
    clickHandler?: (event) => void
  }

  /**
   * @inheritDoc
  **/
  constructor(options) {
    // don't forget to call the parent constructor
    super(options)
    // bind the handleClick
    this.handleClick = this.handleClick.bind(this)
  }

  /**
   * handleClick catch the user left click on a link and update history accordingly
   *
   * @method handleClick
   * @param {Event} event - the mouse event
   * @return {void}
  **/
  handleClick(event) {
    const { clickHandler, target } = this.args
    // if a custom handler is provided, use it
    if (clickHandler) {
      clickHandler(event)
    }
    // if it's a desired left click
    if (!event.defaultPrevented
      && event.button === 0
      && !target
      && !isModifiedEvent(event)
    ) {
      // prevent default event behaviour
      event.preventDefault()

      const { to, historyPush, historyReplace, historyBlock } = this.args
      // should we replace or push to history
      if (historyReplace) {
        historyReplace(to)
      } else {
        historyPush(to)
      }
    }
  }
}
