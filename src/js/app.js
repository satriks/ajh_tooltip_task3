// import { DomControl } from './components/DomControl'

// const control = new DomControl()
// control.init() // тестовое заполнение
import moment from 'moment';
import { Calendare } from './components/Calendare';
// console.log(moment().format('YY'));
// console.log(moment().format('YYYY'));
// console.log(moment().format('MM'));
// console.log(moment().format('DD'));
// console.log(moment().format(''));
// console.log(moment().calendar());

const calendar = new Calendare()
const testNode = document.querySelector('.calendar-widget')
const year = moment().format('YYYY')
const month = moment().format('MM')

console.log(year);
console.log(month);
calendar.create(testNode, year, month)

// this.year = Number(this.moment.format('YYYY'));
// this.month = Number(this.moment.format('MM'));