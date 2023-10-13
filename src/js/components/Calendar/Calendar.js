import moment from 'moment'
export class Calendar {
  constructor () {
    this.moment = moment()
    this.moment.localeData('ru')
    this.monthEl = null
    this.year = null
    this.date = null
  }

  create (elem, year, month) {
    this.monthEl = month - 1
    this.year = year
    this.date = new Date(year, this.monthEl)

    const head = this.createHead()
    const { calendarWidget, table } = head
    elem.appendChild(calendarWidget)
    let row = document.createElement('tr')

    for (let i = 0; i < this.getDay(this.date); i++) {
      const item = document.createElement('td')
      row.appendChild(item)
    }

    while (this.date.getMonth() === this.monthEl) {
      const roeDate = document.createElement('td')
      roeDate.innerText = this.date.getDate()
      row.appendChild(roeDate)

      if (this.getDay(this.date) % 7 === 6) {
        table.appendChild(row)
        row = document.createElement('tr')
      }

      this.date.setDate(this.date.getDate() + 1)
    }

    if (this.getDay(this.date) !== 0) {
      for (let i = this.getDay(this.date); i < 7; i++) {
        const item = document.createElement('td')
        row.appendChild(item)
      }
    }

    table.appendChild(row)

    elem.appendChild(table)

    this.getMarker()

    return elem
  }

  getMarker () {
    const arr = Array.from(document.querySelectorAll('td'))

    arr.forEach((el) => {

      if (el.textContent === this.moment.format('D') && this.monthEl === (this.moment.format('M') - 1) && this.year === +this.moment.format('YYYY')) {
        el.classList.add('today')
      }
      if (+el.textContent < +this.moment.format('D') && this.monthEl === (this.moment.format('M') - 1) && this.year === +this.moment.format('YYYY')) {
        el.classList.add('inactive')
      }
      if (this.monthEl < (this.moment.format('M') - 1) && this.year <= (this.moment.format('YYYY'))) {
        el.classList.add('inactive')
      }
      if (this.year < this.moment.format('YYYY')) {
        el.classList.add('inactive')
      }

      if (!el.classList.contains('inactive')) {
        el.classList.add('active')
      }
    })
  }

  getDay (dateF) {
    let day = dateF.getDay()
    if (day === 0) day = 7
    return day - 1
  }

  createHead () {
    const calendarWidget = document.createElement('div')
    calendarWidget.classList.add('calendar__header')

    const prev = document.createElement('div')
    prev.classList.add('prev')
    prev.innerText = '<'

    const calendarTitle = document.createElement('div')
    calendarTitle.classList.add('calendar__title')
    calendarTitle.innerText = this.date.toLocaleString('default', { month: 'long' }) + ' ' + this.year

    const next = document.createElement('div')
    next.classList.add('next')
    next.innerText = '>'

    calendarWidget.append(prev, calendarTitle, next)

    const table = document.createElement('table')
    const row = document.createElement('tr')
    const mon = document.createElement('th')
    mon.innerText = 'пн'
    const tue = document.createElement('th')
    tue.innerText = 'вт'
    const wed = document.createElement('th')
    wed.innerText = 'ср'
    const thu = document.createElement('th')
    thu.innerText = 'чт'
    const fri = document.createElement('th')
    fri.innerText = 'пт'
    const sat = document.createElement('th')
    sat.innerText = 'сб'
    const sun = document.createElement('th')
    sun.innerText = 'вс'

    row.append(mon, tue, wed, thu, fri, sat, sun)
    table.appendChild(row)

    return { calendarWidget, table }
  }
}
