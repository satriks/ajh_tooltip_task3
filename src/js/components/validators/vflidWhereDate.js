export function whereValidate (fromDate, whereDate) {
  if (new Date(fromDate) < new Date(whereDate)) return true
  else {
    const widget = document.querySelector('.calendar-widget')

    const error = document.createElement('div')
    error.classList.add('invalid-date')
    error.innerText = 'Дата "Обратно" должна быть меньше чем дата Туда'

    widget.insertAdjacentElement('afterbegin', error)
    setTimeout(() => error.remove(), 3000)
    return false
  }
}
