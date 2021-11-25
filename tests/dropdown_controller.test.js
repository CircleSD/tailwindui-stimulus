/**
 * @jest-environment jsdom
 */

import { Application, Controller } from "@hotwired/stimulus"
import DropdownController from "../src/dropdown_controller"

describe("DropdownController", () => {
  let application

  describe("when action is clicked and dropdown is not visible", () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.spyOn(global, 'setTimeout')

      document.body.innerHTML = `
        <div class="ml-3 relative"
            data-controller="dropdown"
            data-dropdown-entering-class="transition ease-out duration-100"
            data-dropdown-entering-from-class="transform opacity-0 scale-95"
            data-dropdown-entering-to-class="transform opacity-100 scale-100"
            data-dropdown-leaving-class="transition ease-in duration-75"
            data-dropdown-leaving-from-class="transform opacity-100 scale-100"
            data-dropdown-leaving-to-class="transform opacity-0 scale-95"
        >
          <div>
            <button type="button"
              data-action="click->dropdown#toggle"
              class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button"
              aria-expanded="false"
              aria-hasdropdown="true">
              <span class="sr-only">Open user menu</span>
              Open dropdown
            </button>
          </div>
          <div data-dropdown-target="menu" hidden class="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            Pop up content goes here
          </div>
        </div>
      `
      application = Application.start()
      application.register("dropdown", DropdownController)
    })

    afterEach(() => {
      jest.clearAllTimers()
      jest.useRealTimers()
      application.stop()
    })

    it('applies visible classes to target', async () => {
      const target = document.querySelector('[data-dropdown-target="menu"]')
      const action = document.querySelector('[data-action]')
      action.click()
      jest.runOnlyPendingTimers()

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(target.className).toMatch('opacity-100 scale-100')
    })

    it('applies aria-expanded=true to action', async () => {
      const target = document.querySelector('[data-dropdown-target="menu"]')
      const action = document.querySelector('[data-action]')
      action.click()
      jest.runOnlyPendingTimers()

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(action.attributes["aria-expanded"].value).toMatch('true')
    })

    it('un-hides the target dropdown', async () => {
      const target = document.querySelector('[data-dropdown-target="menu"]')
      const action = document.querySelector('[data-action]')
      action.click()
      jest.runOnlyPendingTimers()

      expect(setTimeout).toHaveBeenCalledTimes(1)
      triggerTransitionEnd(target)
      expect(target.hidden).toBe(false)
    })
  })


  describe("when action is clicked and dropdown is visible", () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.spyOn(global, 'setTimeout')

      document.body.innerHTML = `
        <div class="ml-3 relative"
            data-controller="dropdown"
            data-dropdown-entering-class="transition ease-out duration-100"
            data-dropdown-entering-from-class="transform opacity-0 scale-95"
            data-dropdown-entering-to-class="transform opacity-100 scale-100"
            data-dropdown-leaving-class="transition ease-in duration-75"
            data-dropdown-leaving-from-class="transform opacity-100 scale-100"
            data-dropdown-leaving-to-class="transform opacity-0 scale-95"
        >
          <div>
            <button type="button"
              data-action="click->dropdown#toggle"
              class="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              id="user-menu-button"
              aria-expanded="true"
              aria-hasdropdown="true">
              <span class="sr-only">Open user menu</span>
              Open dropdown
            </button>
          </div>
          <div data-dropdown-target="menu" class="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            Pop up content goes here
          </div>
        </div>
      `
      application = Application.start()
      application.register("dropdown", DropdownController)
    })

    afterEach(() => {
      jest.clearAllTimers()
      jest.useRealTimers()
      application.stop()
    })

    it('applies invisible classes to target', async () => {
      const target = document.querySelector('[data-dropdown-target="menu"]')
      const action = document.querySelector('[data-action]')
      action.click()
      jest.runOnlyPendingTimers()

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(target.className).toMatch('opacity-0 scale-95')
    })

    it('applies aria-expanded=false to action', async () => {
      const target = document.querySelector('[data-dropdown-target="menu"]')
      const action = document.querySelector('[data-action]')
      action.click()
      jest.runOnlyPendingTimers()

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(action.attributes["aria-expanded"].value).toMatch('false')
    })

    it('hides the target dropdown', async () => {
      const target = document.querySelector('[data-dropdown-target="menu"]')
      const action = document.querySelector('[data-action]')
      action.click()
      jest.runOnlyPendingTimers()
      triggerTransitionEnd(target)

      expect(setTimeout).toHaveBeenCalledTimes(1)
      expect(target.hidden).toBe(true)
    })
  })
})

function triggerTransitionEnd(element) {
  let event = new Event('transitionend')
  element.dispatchEvent(event)
}
