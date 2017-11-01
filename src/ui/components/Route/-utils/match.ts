export default class Match {
  isExact: boolean
  params: object
  path: string
  url: string

  constructor(isExact: boolean, params: object, path: string, url: string) {
    this.isExact = isExact
    this.params = params
    this.path = path
    this.url = url
  }
}
