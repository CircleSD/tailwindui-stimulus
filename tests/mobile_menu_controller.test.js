/**
 * @jest-environment jsdom
 */

import { Application, Controller } from "@hotwired/stimulus"
import MobileMenuController from "../src/mobile_menu_controller"

describe("MobileMenuController", () => {
  let application

  describe("when action is clicked", () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="-mr-2 flex md:hidden" data-controller="mobile-menu">
          <button type="button" data-action="click->mobile-menu#toggle" class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="hidden" id="mobile-menu">
        </div>
      `
      application = Application.start()
      application.register("mobile-menu", MobileMenuController)
    })

    afterEach(() => {
      application.stop()
    })

    it("displays the mobile menu", async () => {
      const action = document.querySelector("[data-action]")
      const menu = document.getElementById("mobile-menu")
      const icons = action.getElementsByTagName("svg")

      action.click()  // show

      expect(menu.classList.contains("hidden")).toBe(false)
      expect(icons[0].classList.contains("hidden")).toBe(true)
      expect(icons[1].classList.contains("block")).toBe(true)
    })

    it("hides the mobile menu", async () => {
      const action = document.querySelector("[data-action]")
      const menu = document.getElementById("mobile-menu")
      const icons = action.getElementsByTagName("svg")

      action.click()  // show
      action.click()  // hide

      expect(menu.classList.contains("hidden")).toBe(true)
      expect(icons[0].classList.contains("block")).toBe(true)
      expect(icons[1].classList.contains("hidden")).toBe(true)
    })
  })
})
