import Component, { tracked } from '@glimmer/component'
import matchPath from './-utils/matchPath'
import Match from './-utils/match'

/**
 * GRoute
 *
 * @class GRoute
 * @extends @glimmer/component
**/
export default class GRoute extends Component {
  args: {
    pathname: string,
    path: string,
    exact?: boolean,
    strict?: boolean,
    sensitive?: boolean,
    switchIndex?: number,
    matchAction?: (Match, switchIndex?) => Match
  }

  /**
   * @property {string} path - the path provided to children
  **/
  @tracked('args') get path(): string {
    return this.args.path
  }

  /**
   * @property {Match} match - the match obect determining if route is displayed
  **/
  @tracked('args') get match(): Match {
    const { pathname, path, strict, exact, sensitive, switchIndex, matchAction } = this.args

    let _matchPath = matchPath(pathname, { path, strict, exact, sensitive })

    if (switchIndex && matchAction) {
      _matchPath = matchAction(_matchPath, switchIndex)
    } else if (matchAction) {
      _matchPath = matchAction(_matchPath)
    }

    return _matchPath
  }
}
