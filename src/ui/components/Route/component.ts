import Component, { tracked } from '@glimmer/component'
import matchPath from './-utils/matchPath'
import Match from './-utils/match'

/**
 * Route
 *
 * @class Route
 * @extends @glimmer/component
**/
export default class Route extends Component {
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

  _cachedMatchs: object = {}

  /**
   * @property {Match} match - the match obect determining if route is displayed
  **/
  @tracked('args') get match(): Match {
    const { pathname, path, strict, exact, sensitive, switchIndex, matchAction } = this.args

    if (this._cachedMatchs[pathname]) {
      return this._cachedMatchs[pathname]
    }

    let _matchPath =  matchPath(pathname, { path, strict, exact, sensitive })

    if (matchAction) {
      if (switchIndex) {
        _matchPath = matchAction(_matchPath, switchIndex)
      } else {
        _matchPath = matchAction(_matchPath)
      }
    }
    
    this._cachedMatchs = {
      ...this._cachedMatchs,
      [pathname]: _matchPath
    }

    return _matchPath
  }
}
