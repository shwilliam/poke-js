# poke-js

> A small reactivity system

[![Demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/94l470xr3w?autoresize=1&fontsize=12&hidenavigation=1)

## Usage

Import `poke-js` by including the following script tag in your HTML:

```html
<script src="https://unpkg.com/poke-js"></script>
```

The global variable `Poke` is now available with the `init` & `watch` methods. Use these to initialize your data object and add 'watcher' functions to be run whenever any of their data dependencies are updated.

```js
const { init, watch } = Poke

let data = { price: 5, quantity: 2 }
init(data)

// total output
const totalOutput = document.getElementById('totalOutput')
watch(() => totalOutput.innerText = data.price * data.quantity)
```

In this example, any changes to the `price` or `quantity` properties of `data`, will update the DOM element with the id `totalOutput`.

The properties of the data passed to `Poke.init()` are also easily bound to the `value` & `innerText` of DOM elements by using the `data-bind` attribute.

```html
Price: <span data-bind="price"></span>
```

Furthermore, `poke-js` will listen to change events on any element with the `data-input` attribute and reflect the change in the corresponding data value.

```html
<input data-input="quantity" type="number" />
```

To see an example of all of this working together, check out [this CodeSandbox](https://codesandbox.io/s/94l470xr3w?autoresize=1&fontsize=12&hidenavigation=1).

## Browser compatibility

| Firefox | Chrome   | Opera  | Edge  |
|:-------:|:--------:|:------:|:-----:|
| ✅      | ✅       | ✅    | ✅    |

## Contributing

This project is open to and encourages contributions! Feel free to discuss any bug fixes/features in the [issues](https://github.com/shwilliam/poke-js/issues). If you wish to work on this project:

1. [Fork the project](https://github.com/shwilliam/poke-js)
2. Create your feature branch (`git checkout -b new-feature-branch`)
3. Commit your changes (`git commit -am 'add new feature'`)
4. Push to the branch (`git push origin new-feature-branch`)
5. [Submit a pull request!](https://github.com/shwilliam/poke-js/pull/new/master)
