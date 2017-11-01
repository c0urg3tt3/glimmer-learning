import Component, { tracked } from '@glimmer/component'

export default class Slider extends Component {
  @tracked slideWidth = 0
  @tracked currentIndex = 0

  ratio: any = (5 / 1).toFixed(2)

  @tracked('slideWidth')
  get slideHeight() {
    const { ratio = this.ratio } = this.args
    return (this.slideWidth / ratio).toFixed(2)
  }

  @tracked('slideWidth', 'currentIndex')
  get slidesOffset() {
    return -(this.slideWidth * this.currentIndex)
  }

  constructor(options) {
    super(options)
    this.resize = this.resize.bind(this)
  }

  didInsertElement() {
    setTimeout(() => {
      this.resize(null)
      window.addEventListener('optimizedResize', this.resize)
    }, 0)
  }

  resize(event) {
    this.slideWidth = this.bounds.firstNode['clientWidth']
  }

  willDestroy() {
    window.removeEventListener('optimizedResize', this.resize)
  }


  prevSlide() {
    const prevIndex = this.currentIndex - 1
    const max = this.args.slidesLength - 1
    const slideIndex = (prevIndex >= 0) ? prevIndex : max

    this.pickSlide(slideIndex)
  }

  pickSlide(slideIndex) {
    this.currentIndex = slideIndex
  }

  nextSlide() {
    const nextIndex = this.currentIndex + 1
    const max = this.args.slidesLength - 1
    const slideIndex = (nextIndex <= max) ? nextIndex : 0

    this.pickSlide(slideIndex)
  }
}
