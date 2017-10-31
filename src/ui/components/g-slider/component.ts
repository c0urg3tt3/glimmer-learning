import Component, { tracked } from '@glimmer/component'

(function() {
  // https://developer.mozilla.org/en-US/docs/Web/Events/resize
  // requestAnimationFrame + customEvent
  function throttle(type, name, obj = window) {
      var running = false
      var func = function() {
          if (running) { return }
          running = true
            requestAnimationFrame(function() {
              obj.dispatchEvent(new CustomEvent(name))
              running = false
          })
      }
      obj.addEventListener(type, func)
  }

  throttle("resize", "optimizedResize")
})()

export default class GSlider extends Component {
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

  willDestroy() {
    window.removeEventListener('optimizedResize', this.resize)
  }

  resize(event) {
    this.slideWidth = this.element['clientWidth']
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
