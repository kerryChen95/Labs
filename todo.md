# Todo

- [x] conver tabs to spaces in all files
- [x] script markup's compatible load event
  - [x] dev
  - [x] test
- [ ] add unit-test framework
- [ ] HTML5 API
  - [ ] Drag-and-Drop
- [x] add util: invoke callback as soon as possible after document is ready for manipulation
- [ ] real time communication
- [ ] XHR2 progress events
  - [ ] Drag-and-Drop then upload progressly
- [ ] XHR `onreadystatechange` event
  - [ ] Order
  - [ ] Skip
  - [ ] Reset
  - [ ] When cross-origin
  - [ ] `onreadystatechange` event handler is called asynchronous or not?
- [ ] XHR timeout and abort
- [ ] XHR2 timeout
- [ ] XHR abort for auto-complete suggestions
- [ ] form data
  - [ ] encode form-data
    - [x] dev
    - [ ] test
  - [ ] using XHR2 `FormData` for mulitipart form-data
    - [x] dev
    - [ ] test
- [ ] encode form-data
  - [x] dev
  - [ ] test
- [ ] cross-origin
  - [x] by normal XHR
  - [x] by `img` tag
  - [x] by `script` tag, JSONP
  - [ ] by `iframe` tag
  - [ ] by CORS
    - [x] GET
    - [x] POST with `application/x-www-form-urlencoded`
    - [x] POST with `multipart/form-data`
    - [x] POST with `text/plain`
    - [x] preflight
    - [ ] in IE 8, 9
  - [ ] by modify `document.host`

## Doubt

- Would those objects that are not being referenced but making networking interactive be garbage collected?
- Why replace `' '` with `'+'` before pass to `encodeURIComponent`
