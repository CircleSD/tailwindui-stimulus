/**
 * @jest-environment jsdom
 */

import { Application, Controller } from "@hotwired/stimulus"
import ModalController from "../src/modal_controller"

describe("ModalController", () => {
  let application

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(global, "setTimeout")

    document.body.innerHTML = `
      <div class="fixed z-10 inset-0 overflow-y-auto" hidden id="test_modal"
            data-action="show->modal#show hide->modal#hide"
            data-controller="modal"
            data-modal-overlay-entering-class="ease-out duration-300"
            data-modal-overlay-entering-from-class="opacity-0"
            data-modal-overlay-entering-to-class="opacity-100"
            data-modal-overlay-leaving-class="ease-in duration-200"
            data-modal-overlay-leaving-from-class="opacity-100"
            data-modal-overlay-leaving-to-class="opacity-0"
            data-modal-panel-entering-class="ease-out duration-300"
            data-modal-panel-entering-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            data-modal-panel-entering-to-class="opacity-100 translate-y-0 sm:scale-100"
            data-modal-panel-leaving-class="ease-in duration-200"
            data-modal-panel-leaving-from-class="opacity-100 translate-y-0 sm:scale-100"
            data-modal-panel-leaving-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity modal-overlay" hidden aria-hidden="true"></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div hidden class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full modal-panel">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 modal-title" id="modal-title"></h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 modal-body"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" data-action="click->modal#confirm" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                OK
              </button>
              <button type="button" data-action="click->modal#cancel" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    `
    application = Application.start()
    application.register("modal", ModalController)
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
    application.stop()
  })

  it("displays a modal when the show method is invoked", async () => {
    const modal = document.getElementById("test_modal")
    const overlay = modal.getElementsByClassName("modal-overlay")[0]
    const panel = modal.getElementsByClassName("modal-panel")[0]

    // ask the modal to show itself
    const showEvent = new CustomEvent("show")
    modal.dispatchEvent(showEvent)
    jest.runOnlyPendingTimers()

    expect(setTimeout).toHaveBeenCalledTimes(2) // check both transitions were triggered
    expect(overlay.className).toMatch("opacity-100")
    expect(panel.className).toMatch("opacity-100")
  })

  it("hides the modal when the hide method is invoked", async () => {
    const modal = document.getElementById("test_modal")
    const overlay = modal.getElementsByClassName("modal-overlay")[0]
    const panel = modal.getElementsByClassName("modal-panel")[0]

    // display the modal so we can test the hide method
    const showEvent = new CustomEvent("show")
    modal.dispatchEvent(showEvent)
    jest.runOnlyPendingTimers()
    triggerTransitionEnd(overlay)
    triggerTransitionEnd(panel)

    // ask the modal to hide itself
    const hideEvent = new CustomEvent("hide")
    modal.dispatchEvent(hideEvent)
    jest.runOnlyPendingTimers()

    expect(setTimeout).toHaveBeenCalledTimes(4) // check all transitions were triggered (2xshow + 2xhide)
    expect(overlay.className).toMatch("opacity-0")
    expect(panel.className).toMatch("opacity-0")
  })

  it("emits a 'confirmed' event when the confirm action is invoked", async () => {
    const modal = document.getElementById("test_modal")
    const panel = modal.getElementsByClassName("modal-panel")[0]
    const action = panel.querySelector("[data-action='click->modal#confirm']")
    const dispatchEventSpy = jest.spyOn(modal, "dispatchEvent");

    action.click()

    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe("modal:confirmed");
  })

  it("emits a 'cancelled' event when the cancel action is invoked", async () => {
    const modal = document.getElementById("test_modal")
    const panel = modal.getElementsByClassName("modal-panel")[0]
    const action = panel.querySelector("[data-action='click->modal#cancel']")
    const dispatchEventSpy = jest.spyOn(modal, "dispatchEvent");

    action.click()

    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchEventSpy.mock.calls[0][0].type).toBe("modal:cancelled");
  })
})

function triggerTransitionEnd(element) {
  let event = new Event("transitionend")
  element.dispatchEvent(event)
}
