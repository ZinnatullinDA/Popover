import Popover from '../js/Popover'

describe('popover', () => {
  let btn
  let popover

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="btn" data-title="T" data-content="C">Click</button>
    `
    btn = document.querySelector('#btn')
    popover = new Popover(btn)
    popover.init()
  })

  afterEach(() => {
    popover.destroy()
    document.body.innerHTML = ''
  })

  test('should show popover on click', () => {
    btn.click()
    const el = document.querySelector('.popover')
    expect(el).not.toBeNull()
    expect(el.querySelector('.popover__title').textContent).toBe('T')
    expect(el.querySelector('.popover__content').textContent).toBe('C')
  })

  test('should hide popover on second click', () => {
    btn.click()
    btn.click()
    expect(document.querySelector('.popover')).toBeNull()
  })
})
