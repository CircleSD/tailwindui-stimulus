# TailwindUI Stimulus Controllers

This is our collection of Stimulus controllers that help drive various TailwindCSS/UI components.

## Confirmation Controller

A simple controller that handles the display of a browser confirmation dialog. This is typically used in conjunction with forms that require an "Are you sure?" confirmation before being submitted. If the "cancel" button is pressed event propagation is stopped.

```
<button data-controller="confirmation"
        data-action="submit->confirmation#confirm"
        confirmation-message-value="Are you sure?"
>Click me!<button>
```

## Dropdown Controller

This controller toggles the display of a dropdown element. It will use transitions to do this and as such requires three sets of CSS classes for both "entering" and "leaving" states (i.e. show and hide). These take the form of `data-` attributes, for example: -

```
<div class="ml-3 relative"
     data-controller="dropdown"
     data-dropdown-entering-class="transition ease-out duration-100"
     data-dropdown-entering-from-class="transform opacity-0 scale-95"
     data-dropdown-entering-to-class="transform opacity-100 scale-100"
     data-dropdown-leaving-class="transition ease-in duration-75"
     data-dropdown-leaving-from-class="transform opacity-100 scale-100"
     data-dropdown-leaving-to-class="transform opacity-0 scale-95"
>
...
</div>
```

## Mobile Menu Controller

Another simple controller that toggles the visibility of a mobile menu contained within a navbar. It also toggles visibility of two SVG icons, typically these take the form of "open" and "close" icons, the "open" icon should be before the "close" icon in the html.

The `aria-controls` attribute value should be the ID of the `div` that contains the mobile menu content.

```
<div class="md:hidden" data-controller="mobile-menu">
  <button type="button" data-action="click->mobile-menu#toggle" aria-controls="mobile-menu" aria-expanded="false">
    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>
<div class="hidden" id="mobile-menu">
  Menu content goes here
</div>
```

## Modal Controller

This controller will toggle the visibility of a modal, it uses transitions to do this and requires three sets of classes for the "entering" and "leaving" states for both the modal itself and the overlay. For example: -

```
<div class="fixed z-10 inset-0 overflow-y-auto" hidden id="delete-modal"
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
     aria-labelledby="modal-title" role="dialog" aria-modal="true"
>
...
</div>
```

The overlay and modal content divs should have class names `modal-overlay` and `modal-panel` respectively. One or two buttons can be used and these can be wired up to the `confirm` or `cancel` controller methods. Both of these methods also emit events that can be listened for. Note: the `confirm` method will not hide the modal, whilst the `cancel` method will. This is by design as the assumption is that the UI will be redrawn on confirmation - if modal hiding is required on `confirm` you will need to call the controller's `hide` method in your code.

## Toast Controller

This controller will automatically remove toast elements after a given period of time, by default this is 5 seconds. Delay values should be specified in milliseconds, for example this would autohide after 10 seconds: -

```
<div data-controller="toast" data-toast-delay-value="10000">...</div>
```

With no data value attributes, the default of 5 seconds will be used: -
```
<div data-controller="toast">...</div>
```

Specifying `false` for the `autohide` value will persist the toast on screen until the user clicks the close button: -
```
<div data-controller="toast" data-toast-autohide-value="false">...</div>
```

## Transition Helper

The included `TransitionHelper` class provides the controllers that use transitions with an easy to use mechanism to perform the transformation. These take the form of `base`, `from` and `to` CSS class sets. For example, transitioning from zero to full opacity: -

```
var transition = new TransitionHelper(element, "transition ease-out duration-300", "transform opacity-0", "transform opacity-100")
transition.start()
```

## Contributing

Bug reports and pull requests are welcome on [GitHub](https://github.com/CircleSD/tailwindui-stimulus). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/CircleSD/tailwindui-stimulus/blob/main/CODE_OF_CONDUCT.md).

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

To run tests:

```bash
yarn install
yarn run test
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in the project's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/CircleSD/tailwindui-stimulus/blob/main/CODE_OF_CONDUCT.md).
