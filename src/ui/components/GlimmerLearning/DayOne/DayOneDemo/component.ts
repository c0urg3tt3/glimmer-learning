import Component from '@glimmer/component'

export default class DayOneDemo extends Component {
  private _mapSlides = (item, index) => ({
    src: `./assets/images/slide_${index}.png`,
    alt: `slide #${index + 1}`
  })

  slides = new Array(7).fill(null).map(this._mapSlides)

  slide = new Array(1).fill(null).map(this._mapSlides)

  ratio_1_1 = (1 / 1).toFixed(2)
  ratio_4_3 = (4 / 3).toFixed(2)
  ratio_3_2 = (3 / 2).toFixed(2)
  ratio_16_9 = (16 / 9).toFixed(2)
  ratio_16_10 = (16 / 10).toFixed(2)
}
