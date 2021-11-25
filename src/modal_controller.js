/*
 * A Stimulus controller to toggle the visibility of a Tailwind CSS modal.
 * It requires inclusion of the TransitionHelper class.
 *
 * Additionally, broadcast events when the "OK" or "Cancel" buttons are clicked.
 *
 * This controller requires html and attributes such as: -
 *
 * <div class="fixed z-10 inset-0 overflow-y-auto" hidden id="delete-modal"
 *      data-action="show->modal#show hide->modal#hide"
 *      data-controller="modal"
 *      data-modal-overlay-entering-class="ease-out duration-300"
 *      data-modal-overlay-entering-from-class="opacity-0"
 *      data-modal-overlay-entering-to-class="opacity-100"
 *      data-modal-overlay-leaving-class="ease-in duration-200"
 *      data-modal-overlay-leaving-from-class="opacity-100"
 *      data-modal-overlay-leaving-to-class="opacity-0"
 *      data-modal-panel-entering-class="ease-out duration-300"
 *      data-modal-panel-entering-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
 *      data-modal-panel-entering-to-class="opacity-100 translate-y-0 sm:scale-100"
 *      data-modal-panel-leaving-class="ease-in duration-200"
 *      data-modal-panel-leaving-from-class="opacity-100 translate-y-0 sm:scale-100"
 *      data-modal-panel-leaving-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
 *      aria-labelledby="modal-title" role="dialog" aria-modal="true">
 *   <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
 *     <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity modal-overlay" hidden aria-hidden="true"></div>
 *
 *     <!-- This element is to trick the browser into centering the modal contents. -->
 *     <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

 *     <div hidden class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal-panel">
 *       <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
 *         <div class="sm:flex sm:items-start">
 *           <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
 *             <h3 class="text-lg leading-6 font-medium text-gray-900 modal-title" id="modal-title"></h3>
 *             <div class="mt-2">
 *               <p class="text-sm text-gray-500 modal-body"></p>
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *       <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
 *         <button type="button" data-action="click->modal#confirm" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
 *           OK
 *         </button>
 *         <button type="button" data-action="click->modal#cancel" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
 *           Cancel
 *         </button>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * The transition classes (for overlay and panel) defined above work as follows: -
 *
 * "entering-class" / "leaving-class" - a base set of classes to be applied for the whole duration of the transition
 * "....-from-class" - a set of classes that determine the transition starting state
 * "....-to-class"   - a set of classes that determine the transition finishing state
 */

import { Controller } from "@hotwired/stimulus"
import { TransitionHelper } from "./transition_helper"

export default class extends Controller {
  static classes = [
    "overlayEntering", "overlayEnteringFrom", "overlayEnteringTo", "overlayLeaving", "overlayLeavingFrom", "overlayLeavingTo",
    "panelEntering", "panelEnteringFrom", "panelEnteringTo", "panelLeaving", "panelLeavingFrom", "panelLeavingTo"
  ]

  confirm(event) {
    // send out a "modal:confirmed" event to notify listeners that we've confirmed the action
    // listen with "data-action": "modal:confirmed@document->other-controller#confirmMethod"
    this.element.dispatchEvent(
      new Event("modal:confirmed", {
        bubbles: true,
        cancelable: false,
      })
    )
  }

  cancel(event) {
    // send out a "modal:cancelled" event to notify listeners that we've cancelled the action
    // listen with "data-action": "modal:cancelled@document->other-controller#cancelMethod"
    this.element.dispatchEvent(
      new Event("modal:cancelled", {
        bubbles: true,
        cancelable: false,
      })
    )

    // hide the modal
    this._hide()
  }

  hide() {
    this._hide()
  }

  show() {
    this._show()
  }

  _show() {
    // show the modal overlay with transition
    var overlayEl = this.element.getElementsByClassName("modal-overlay")[0]
    var overlayTransition = new TransitionHelper(overlayEl, this.overlayEnteringClasses, this.overlayEnteringFromClasses, this.overlayEnteringToClasses)
    overlayTransition.start()

    // show the modal panel with transition
    var panelEl = this.element.getElementsByClassName("modal-panel")[0]
    var modalTransition = new TransitionHelper(panelEl, this.panelEnteringClasses, this.panelEnteringFromClasses, this.panelEnteringToClasses)
    modalTransition.start()

    // un-hide the modal outer frame
    this.element.hidden = false
  }

  _hide() {
    // hide the modal overlay with transition
    var overlayEl = this.element.getElementsByClassName("modal-overlay")[0]
    var overlayTransition = new TransitionHelper(overlayEl, this.overlayLeavingClasses, this.overlayLeavingFromClasses, this.overlayLeavingToClasses)
    overlayTransition.start()

    // hide the modal panel with transition
    var panelEl = this.element.getElementsByClassName("modal-panel")[0]
    var modalTransition = new TransitionHelper(panelEl, this.panelLeavingClasses, this.panelLeavingFromClasses, this.panelLeavingToClasses)
    modalTransition.start()

    // when modal panel transition ends, hide the modal outer frame
    var _this = this
    panelEl.addEventListener('transitionend', () => {
      _this.element.hidden = true
    }, { once: true })
  }
}
