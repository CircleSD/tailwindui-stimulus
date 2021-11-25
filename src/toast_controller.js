/*
 * A Stimulus controller to automatically hide Tailwind CSS toasts.
 *
 * This controller requires html and attributes such as: -
 *
 * <div class="flex justify-end toast" data-controller="toast" data-toast-delay-value="10000">
 *   <div class="w-full px-3 py-3 shadow-2xl flex flex-col items-center border border-gray-200 sm:w-auto sm:m-1 sm:rounded-lg sm:flex-row bg-white">
 *     <div class="flex text-sm font-medium text-gray-900 ml-3">
 *       <p>Some content here</p>
 *     </div>
 *
 *     <div class="flex ml-6">
 *       <button data-action="click->toast#dismiss">X</button>
 *     </div>
 *   </div>
 * </div>
 *
 * "toast-delay-value" sets the number of milliseconds the toast should remain on screen before
 * it is automatically removed.
 *
 * "toast-autohide-value" if set to "false" will persist the toast on screen until the user
 * dismisses it.
 *
 */

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    delay: { type: Number, default: 5000 },
    autohide: { type: Boolean, default: true }
  }

  connect() {
    // if autohide is enabled, set the timeout to remove the toast
    if (this.autohideValue) {
      this._timeout = setTimeout(() => {
        this.hide()
      }, this.delayValue)
    }
  }

  // remove this toast from the DOM
  hide() {
    this._clearTimeout()
    this.element.remove()
  }

  // handle dismiss button click
  dismiss(event) {
    this.hide()
    event.preventDefault()
    event.stopImmediatePropagation()
  }

  // reset any pending auto-hide timeout
  _clearTimeout() {
    clearTimeout(this._timeout)
    this._timeout = null
  }
}
