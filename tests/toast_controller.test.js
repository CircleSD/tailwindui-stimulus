/**
 * @jest-environment jsdom
 */

import { Application, Controller } from "@hotwired/stimulus"
import ToastController from "../src/toast_controller"

describe("ToastController", () => {
  let application

  describe("when a toast is shown", () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.spyOn(global, "setTimeout")

      document.body.innerHTML = `
        <div class="flex justify-end toast" data-controller="toast" data-toast-delay-value="10000" id="test_toast">
          <div class="w-full px-3 py-3 shadow-2xl flex flex-col items-center border border-gray-200 sm:w-auto sm:m-1 sm:rounded-lg sm:flex-row bg-white">
            <div class="flex text-sm font-medium text-gray-900 ml-3">
              <p>Some content here</p>
            </div>

            <div class="flex ml-6">
              <button data-action="click->toast#dismiss">X</button>
            </div>
          </div>
        </div>
      `
      application = Application.start()
      application.register("toast", ToastController)
    })

    afterEach(() => {
      jest.clearAllTimers()
      jest.useRealTimers()
      application.stop()
    })

    it("removes it when the close button is clicked", async () => {
      const target = document.getElementById("test_toast")
      const action = document.querySelector("[data-action]")
      expect(target).not.toBe(null)
      action.click()

      const target2 = document.getElementById("#test_toast")
      expect(target2).toBe(null)
    })

    it("removes it after the specified timeout", async () => {
      const target = document.getElementById("test_toast")
      expect(target).not.toBe(null)
      jest.advanceTimersByTime(10000)
      expect(setTimeout).toHaveBeenCalledTimes(1)

      const target2 = document.getElementById("test_toast")
      expect(target2).toBe(null)
    })
  })
})
