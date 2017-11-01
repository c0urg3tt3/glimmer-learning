import Component from '@glimmer/component'
import md from './-utils/page.md'

export default class DayTwo extends Component {
  html: string = ''

  constructor(options) {
    super(options)

    this.html = md
  }
}
