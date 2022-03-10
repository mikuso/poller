# @flamescape/poller

A bit like `setInterval()`, but with a slightly different API and slightly different behaviour.

## Why?

- setInterval does not provide an "air-gap" time between calls, making it possible to enter callback runaway. Poller `await`s on the result of the given callback before scheduling the next call.
- Stopping a poller instance returns a promise which resolves once any outstanding callbacks have resolved.

## Usage

```js
import {createPoller} from '@flamescape/poller';

const poller = createPoller(() => {
    // do something every 1000ms
, 1000);

// later...
await poller.stop();
```

## API

### createPoller(callback, interval, options)

- `callback`: a function to call every `interval` ms.
- `interval`: the number of milliseconds "air-gap" interval between calls of the callback function.
- `options`:
    - `autoStart`: if true, equivalent to calling `.start()` on the poller instance immediately after creation.

returns a `Poller` instance.

### Poller#start()

Starts the poller if not already started. If already started, this is a no-op.

### Poller#stop() : Promise

Stops polling and returns a promise which resolves once any pending async callback completes.

## Notes

- Poller will not attempt to handle any errors which are thrown from within your callback. You should ensure that your callback cannot throw.

## License

MIT
