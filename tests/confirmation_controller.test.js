/**
 * @jest-environment jsdom
 */

import { Application, Controller } from "@hotwired/stimulus"
import ConfirmationController from "../src/confirmation_controller"

describe("ConfirmationController", () => {
  let application
  let confirmSpy

  describe("when action is clicked", () => {
    beforeEach(() => {
      jest.useFakeTimers()

      // mock the confirm function to always respond with "OK"
      confirmSpy = jest.spyOn(window, "confirm")
      confirmSpy.mockImplementation(jest.fn(() => true))

      document.body.innerHTML = `
        <button data-controller="confirmation"
                data-action="click->confirmation#confirm"
                confirmation-message-value="Are you sure?"
        >Click me!<button>
      `
      application = Application.start()
      application.register("confirmation", ConfirmationController)
    })

    afterEach(() => {
      jest.clearAllTimers()
      jest.useRealTimers()
      confirmSpy.mockRestore()
      application.stop()
    })

    it("displays a confirmation dialog", async () => {
      const action = document.querySelector("[data-action]")
      action.click()
      expect(window.confirm).toBeCalled()
    })
  })
})
