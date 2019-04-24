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
}

export function watch (fn) {
  activeFn = fn
  fn()
  activeFn = null
}
