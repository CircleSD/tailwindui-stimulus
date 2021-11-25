/*
 * A Stimulus controller to toggle the visibility of Tailwind CSS mobile menu.
 *
 * This controller requires html and attributes such as: -
 *
 *  <div class="-mr-2 flex md:hidden" data-controller="mobile-menu">
 *    <button type="button" data-action="click->mobile-menu#toggle" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
 *      <span class="sr-only">Open main menu</span>
 *      <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 *        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
 *      </svg>
 *      <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
 *        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
 *      </svg>
 *    </button>
 *  </div>
 *
 *  <div class="hidden" id="mobile-menu">
 *    Menu content goes here
 *  </div>
 *
 */

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { message: String }

  toggle(event) {
    let el = event.currentTarget

    let menu = document.getElementById(el.attributes["aria-controls"].value)
    let hidden = (el.attributes["aria-expanded"].value == 'false')
    let icons = el.getElementsByTagName("svg")

    if (hidden) {
      el.attributes["aria-expanded"].value = true
      menu.classList.add("block")
      menu.classList.remove("hidden")

      icons[0].classList.remove("block")
      icons[0].classList.add("hidden")
      icons[1].classList.add("block")
      icons[1].classList.remove("hidden")
    }
    else
    {
      el.attributes["aria-expanded"].value = false
      menu.classList.remove("block")
      menu.classList.add("hidden")

      icons[0].classList.add("block")
      icons[0].classList.remove("hidden")
      icons[1].classList.remove("block")
      icons[1].classList.add("hidden")
    }

    event.preventDefault()
    event.stopImmediatePropagation()
  }
}
