export default class Popover {
  constructor(anchorEl, { title, content } = {}) {
    this.anchorEl = anchorEl
    this.title = title ?? anchorEl.dataset.title
    this.content = content ?? anchorEl.dataset.content

    if (!this.title || !this.content) {
      throw new Error('Popover requires title and content')
    }

    this.popoverEl = null

    this.handleToggle = this.handleToggle.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  init() {
    this.anchorEl.addEventListener('click', this.handleToggle)
    window.addEventListener('resize', this.handleResize)
  }

  destroy() {
    this.anchorEl.removeEventListener('click', this.handleToggle)
    window.removeEventListener('resize', this.handleResize)
    this.hide()
  }

  isShown() {
    return Boolean(this.popoverEl)
  }

  handleToggle() {
    if (this.isShown())
      this.hide()
    else this.show()
  }

  handleResize() {
    if (this.isShown())
      this.position()
  }

  show() {
    this.popoverEl = document.createElement('div')
    this.popoverEl.className = 'popover'

    this.popoverEl.innerHTML = `
      <div class="popover__title"></div>
      <div class="popover__content"></div>
    `

    this.popoverEl.querySelector('.popover__title').textContent = this.title
    this.popoverEl.querySelector('.popover__content').textContent = this.content

    document.body.appendChild(this.popoverEl)
    this.position()
  }

  hide() {
    if (!this.popoverEl)
      return
    this.popoverEl.remove()
    this.popoverEl = null
  }

  position() {
    const a = this.anchorEl.getBoundingClientRect()
    const p = this.popoverEl.getBoundingClientRect()

    const left = a.left + a.width / 2 - p.width / 2

    const gap = 10
    const top = a.top - p.height - gap

    const scrollX = window.pageXOffset
    const scrollY = window.pageYOffset

    this.popoverEl.style.left = `${left + scrollX}px`
    this.popoverEl.style.top = `${top + scrollY}px`
  }
}
