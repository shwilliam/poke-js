/* poke-js
 **********/

// Usage:
// 1. run init with your data obj to set up appropriate getters/setters on vars
// 2. create a reactive variable by passing its assignment in a fn to watch

let activeFn
function Dependency () {
  const updaters = []

  const addUpdater = () =>
    (activeFn && !updaters.includes(activeFn)) &&
      updaters.push(activeFn)

  const runUpdaters = () =>
    updaters.forEach(fn => fn())

  return { addUpdater, runUpdaters }
}

export function init (data) {
  Object.keys(data).forEach(key => {
    const dependency = new Dependency()

    let value = data[key]
    Object.defineProperty(data, key, {
      get () {
        dependency.addUpdater()
        return value
      },
      set (newValue) {
        value = newValue
        dependency.runUpdaters()
      }
    })
  })

  const reactiveEls = Array.from(
    document.querySelectorAll('[p-data]')
  )

  reactiveEls.forEach(el => {
    const key = el.getAttribute('p-data')
    watch(() => {
      el.value
        ? el.value = data[key]
        : el.innerText = data[key]
    })
  })

  const inputEls = Array.from(
    document.querySelectorAll('[p-input]')
  )

  inputEls.forEach(el => {
    const key = el.getAttribute('p-input')

    el
      .addEventListener('change', e => {
        data[key] = e.target.value
      })
  })
}

export function watch (fn) {
  activeFn = fn
  fn()
  activeFn = null
}
