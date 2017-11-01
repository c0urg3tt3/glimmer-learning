import Component, { tracked } from '@glimmer/component';

/**
 * RouteSwitch
 *
 * @class RouteSwitch
 * @extends @glimmer/component
**/
export default class RouteSwitch extends Component {
  /**
   * @constructor
   * @param {Object} options - inherit
  **/
  constructor(options) {
    // don't forget to call the parent constructor
    super(options)
    // bind the switchAction
    this.switchAction = this.switchAction.bind(this)
  }

  /**
   * @property {Boolean} hasMatchedChild - flag when a child is matched by switchAction
  **/
  hasMatchedChild = false

  /**
   * used to reset the hasMatchedChild property when all children have been iterated
   *
   * @property {Number} step - count the number of child that use the switchAction
  **/
  step = 0

  /**
   * switchAction ensure only one child is matched in the switch
   *
   * @method
   * @param {Object} match - the match result of child against router new pathname
   * @param {Number} index - the index of the child currently proceessed
   * @return {Object} a new matching result for child
  **/
  switchAction(match, index) {
    // init match state
    let isExact = false
    // increment step counter
    this.step += 1
    // check if we looped over chilren
    if (this.step > index) {
      // if so reinit counter and flag
      this.hasMatchedChild = false
      this.step = 0
    }
    // has match or switch allready matched
    if (!match || this.hasMatchedChild) {
      // match is false
      isExact = false
    } else if (match.isExact) {
      // match is true
      this.hasMatchedChild = true
      isExact = true
    }
    // return new match
    return {
      ...match,
      isExact: isExact
    }
  }
}
