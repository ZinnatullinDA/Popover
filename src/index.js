import Popover from './js/Popover'
import './css/style.css'

const btn = document.querySelector('#popoverBtn')
const popover = new Popover(btn)
popover.init()
