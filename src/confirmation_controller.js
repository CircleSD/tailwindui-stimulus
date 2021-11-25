/*
 * A Stimulus controller to show a browser confirmation dialog.
 *
 * If the dialog is cancelled event propagation is ceased.
 *
 * This controller requires html and attributes such as: -
 *
 * <button data-controller="confirmation"
 *         data-action="submit->confirmation#confirm"   <--- if used within a form
 *         data-action="click->confirmation#confirm"    <--- if standalone
 *         confirmation-message-value="Are you sure?"
 * >Click me!<button>
 *
 * "confirmation-message-value" sets the text you'd like shown in the confirmation dialog
 *
 */

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { message: String }

  confirm(event) {
    if (!window.confirm(this.messageValue)) {
      event.preventDefault()
      event.stopImmediatePropagation()
    }
  }
}
