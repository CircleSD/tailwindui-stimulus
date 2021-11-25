/*
 * A Stimulus controller to toggle the visibility of Tailwind CSS dropdown menus.
 * It requires inclusion of the TransitionHelper class.
 *
 * This controller requires html and attributes such as: -
 *
 *  <div class="ml-3 relative"
 *       data-controller="dropdown"
 *       data-dropdown-entering-class="transition ease-out duration-100"
 *       data-dropdown-entering-from-class="transform opacity-0 scale-95"
 *       data-dropdown-entering-to-class="transform opacity-100 scale-100"
 *       data-dropdown-leaving-class="transition ease-in duration-75"
 *       data-dropdown-leaving-from-class="transform opacity-100 scale-100"
 *       data-dropdown-leaving-to-class="transform opacity-0 scale-95"
 *  >
 *    <div>
 *      <button type="button"
 *        data-action="click->dropdown#toggle"
 *        class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
 *        id="user-menu-button"
 *        aria-expanded="false"
 *        aria-hasdropdown="true">
 *        <span class="sr-only">Open user menu</span>
 *        Open dropdown
 *      </button>
 *    </div>
 *    <div data-dropdown-target="menu" hidden class="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
 *      Pop up content goes here
 *    </div>
 *  </div>
 *
 * The transition classes defined above work as follows: -
 *
 * "entering-class" / "leaving-class" - a base set of classes to be applied for the whole duration of the transition
 * "....-from-class" - a set of classes that determine the transition starting state
 * "....-to-class"   - a set of classes that determine the transition finishing state
 *
 */

import { Controller } from "@hotwired/stimulus"
import { TransitionHelper } from "./transition_helper"

export default class extends Controller {
  static classes = [ "entering", "enteringFrom", "enteringTo", "leaving", "leavingFrom", "leavingTo" ]
  static targets = ["menu"]

  toggle(event) {
    this.menuTargets.forEach((element, index) => {
      if (element.attributes["aria-labelledby"].value == event.currentTarget.id) {
        event.currentTarget.setAttribute("aria-expanded", element.hidden)

        if (element.hidden) {
          this.show(element)
        }
        else
        {
          this.hide(element)
        }
      }
    })

    event.preventDefault()
    event.stopImmediatePropagation()
  }

  show(element) {
    // show the dropdown
    var transition = new TransitionHelper(element, this.enteringClasses, this.enteringFromClasses, this.enteringToClasses)
    transition.start()
  }

  hide(element) {
    // hide the dropdown
    var transition = new TransitionHelper(element, this.leavingClasses, this.leavingFromClasses, this.leavingToClasses)
    transition.start()
  }
}
