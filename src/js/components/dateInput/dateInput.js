export function oneWay () {
  const element = document.createElement('div')
  element.classList.add('date__input')
  const dateForm = document.createElement('div')
  dateForm.classList.add('date-from')
  const name = document.createElement('label')
  name.for = 'date'
  name.innerText = 'Дата :'
  const oneWayInput = document.createElement('input')
  oneWayInput.type = 'text'
  oneWayInput.id = 'date'
  dateForm.append(name, oneWayInput)
  element.appendChild(dateForm)
  return element
}

export function roundTrip () {
  const element = document.createElement('div')
  element.classList.add('date__input')

  const dateForm = document.createElement('div')
  dateForm.classList.add('date-round')

  const fromWrapper = document.createElement('div')
  fromWrapper.classList.add('round-wrapper')
  const nameFrom = document.createElement('label')
  nameFrom.for = 'date'
  nameFrom.innerText = 'Туда :'
  const from = document.createElement('input')
  from.type = 'text'
  from.id = 'date-from'
  fromWrapper.append(nameFrom, from)

  const whereWrapper = document.createElement('div')
  whereWrapper.classList.add('round-wrapper')
  const nameWhere = document.createElement('label')
  nameWhere.for = 'date'
  nameWhere.innerText = 'Обратно :'
  const where = document.createElement('input')
  where.type = 'text'
  where.id = 'date-where'
  whereWrapper.append(nameWhere, where)

  dateForm.append(fromWrapper, whereWrapper)
  element.appendChild(dateForm)
  return element
}
