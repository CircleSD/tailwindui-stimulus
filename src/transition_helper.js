/*
 * A helper class to manage Tailwind CSS transitions.
 *
 * element: the DOM element that is having the transitions applied
 * hidden: should the `element` be hidden (true) or shown (false) after the transition?
 * base: a base set of CSS classes for the transition (e.g. "ease-out duration-300")
 * from: the starting set of CSS classes in the transition (e.g. "opacity-0")
 * to: the ending set of CSS classes in the transition (e.g. "opacity-100")
 *
 */

export class TransitionHelper {
  constructor(element, base, from, to) {
    this.element = element
    this.base = base
    this.from = from
    this.to = to
  }

  start() {
    let frame = 1000 / 60
    let _this = this
    let _hidden = !this.element.hidden

    // apply the base transition classes and our "from" state
    this.element.classList.add(...this.base)
    this.element.classList.add(...this.from)

    // un-hide the element if transitioning from hidden to shown
    if (this.element.hidden) this.element.hidden = false

    // wait a frame for browser to update, then transition
    setTimeout(() => {
        _this.element.classList.remove(..._this.from)
        _this.element.classList.add(..._this.to)

        // when transition ends, clean up css classes and toggle visibility
        _this.element.addEventListener('transitionend', () => {
          _this.element.classList.remove(..._this.base)
          _this.element.classList.remove(..._this.to)
          _this.element.hidden = _hidden
        }, { once: true })
      }, frame)
  }
}
