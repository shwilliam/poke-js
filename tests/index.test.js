const Poke = require('../dist/index.js')
const { init, watch } = Poke

describe('Poke', () => {
  describe('init', () => {
    test('is a function', () => {
      expect(typeof init).toBe('function')
    })
    test('can get value after init', () => {
      const data = { keyFirst: 'val', keySecond: 2 }
      const dataCopy = Object.assign({}, data)
      init(data)

      Object.keys(data).forEach(key => {
        expect(data[key]).toBe(dataCopy[key])
      })
    })
    test('can set value after init', () => {
      const data = { keyFirst: 'val', keySecond: 2 }
      init(data)

      const newData = [4, 'hi']

      data.keyFirst = 'otherVal'
      data.keySecond = [4, 'hi']

      Object.keys(data).forEach((key, i) => {
        data[key] = newData[i]
        expect(data[key]).toBe(newData[i])
      })
    })
  })
  describe('watch', () => {
    test('is a function', () => {
      expect(typeof watch).toBe('function')
    })
    test('runs updater on watch', () => {
      const data = { numFirst: 10, numSecond: 2 }
      init(data)

      let product
      watch(() => {
        product = data.numFirst * data.numSecond
      })

      expect(product).toBe(data.numFirst * data.numSecond)
    })
    test('makes variable reactive', () => {
      const data = { numFirst: 10, numSecond: 2 }
      init(data)

      let product
      watch(() => {
        product = data.numFirst * data.numSecond
      })
      data.numFirst = 12

      expect(product).toBe(data.numFirst * data.numSecond)
    })
  })
  describe('data-bind', () => {
    test('data change updates innerText', () => {
      document.body.innerHTML = `
        <span data-bind="value" id="el" />
      `

      const data = { value: 2 }
      init(data)

      const el = document.getElementById('el')
      expect(el.innerText).toEqual(data.value)
    })
  })
  describe('data-input', () => {
    test('input change updates data', () => {
      document.body.innerHTML = `
        <input data-bind="value" id="el" type="number">
      `

      const data = { value: 2 }
      init(data)

      const el = document.getElementById('el')
      const newVal = 4
      el.value = newVal

      expect(el.value).toEqual(String(newVal))
    })
  })
})
