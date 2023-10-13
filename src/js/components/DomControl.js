import moment from 'moment'
import { Calendar } from './Calendar/Calendar'
import { oneWay, roundTrip } from './dateInput/dateInput'
import { whereValidate } from './validators/vflidWhereDate'

export class DomControl {
  constructor () {
    this.moment = moment()
    this.calendar = new Calendar()
    this.place = document.querySelector('.data-for-trip')
    this.inputState = null
    this.year = +this.moment.format('YYYY')
    this.month = +this.moment.format('MM')
    this.container = document.querySelector('.calendar-widget')
    this.calendarWidget = null

    document.querySelector('#one-way').addEventListener('change', this.onOneWay)
    this.container.addEventListener('click', this.onClick)
  }

  init () {
    this.inputState = oneWay()
    this.place.insertAdjacentElement('afterend', this.inputState)
    document.querySelector('.date__input').addEventListener('click', this.onDateInputClick)
  }

  onOneWay = (event) => {
    this._clearChoosen()
    this.inputState.remove()
    if (event.target.checked) {
      this.inputState = roundTrip()
    } else {
      this.inputState = oneWay()
    }
    this.place.insertAdjacentElement('afterend', this.inputState)
    document.querySelector('.date__input').addEventListener('click', this.onDateInputClick)
  }

  onDateInputClick = (event) => {
    event.preventDefault()
    if (this.container.children.length > 0) this._clearCalendar()
    this.calendarWidget = this.calendar.create(this.container, this.year, this.month)
    this.calendar.createHead()
    this.onListener()
  }

  onPrev = () => {
    this._clearCalendar()
    this._currentMonth(false)

    this.calendarWidget = this.calendar.create(this.container, this.year, this.month)
    this.onListener()
  }

  onNext = () => {
    this._clearCalendar()
    this._currentMonth(true)
    this.calendarWidget = this.calendar.create(this.container, this.year, this.month)
    this.onListener()
  }

  onListener () {
    document.querySelector('.prev').addEventListener('click', this.onPrev)
    document.querySelector('.next').addEventListener('click', this.onNext)
  }

  _currentMonth (type) {
    if (type) this.month += 1
    else this.month -= 1

    if (this.month > 12) {
      this.month = 1
      this.year += 1
    }
    if (this.month < 1) {
      this.month = 12
      this.year -= 1
    }
  }

  _clearCalendar () {
    [...this.calendarWidget.children].forEach(el => el.remove())
  }

  _clearChoosen () {
    document.querySelectorAll('td').forEach(el => el.classList.remove('choose'))
  }

  onClick = (event) => {
    if (event.target.classList.contains('active')) {
      const inputDate = document.querySelector('#date')
      const fromDate = document.querySelector('#date-from')
      const whereDate = document.querySelector('#date-where')
      const date = new Date(this.year + '-' + this.month + '-' + event.target.innerText)
      if (inputDate) {
        if (inputDate.value) this._clearChoosen()
        inputDate.value = date.toDateString()
        event.target.classList.add('choose')
        return
      }
      if (fromDate && fromDate.value) {
        const check = whereValidate(fromDate.value, date.toDateString())
        if (whereDate.value) {
          const chosenDate = [...document.querySelectorAll('.choose')]
          chosenDate.shift()
          chosenDate.forEach(el => el.classList.remove('choose'))
        }
        if (check) {
          whereDate.value = date.toDateString()
          event.target.classList.add('choose')
        }

        return
      }
      if (fromDate) {
        fromDate.value = date.toDateString()
        event.target.classList.add('choose')
      }
    }
  }
}
