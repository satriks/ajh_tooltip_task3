import moment from "moment"
export class Calendare {
    constructor(){
        this.moment = moment();
        this.moment.localeData('ru');
    }

    create(elem, year, month) {
        const monthEl = month - 1;
        const date = new Date(year, monthEl);
    
        let table = `
        <div class="calendar__header">
        <div class="prev"><</div>
        <div class="calendar__title">${date.toLocaleString('default', { month: 'long' })} ${year}</div>
        <div class="next">></div>
        </div>
        <table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>
        `;
    
        for (let i = 0; i < this.getDay(date); i++) {
          table += '<td></td>';
        }
    
        while (date.getMonth() === monthEl) {
          table += `<td>${date.getDate()}</td>`;
    
          if (this.getDay(date) % 7 === 6) {
            table += '</tr><tr>';
          }
    
          date.setDate(date.getDate() + 1);
        }
    
        if (this.getDay(date) !== 0) {
          for (let i = this.getDay(date); i < 7; i++) {
            table += '<td></td>';
          }
        }
    
        table += '</tr></table>';
    
        elem.innerHTML = table;
    
        const arr = Array.from(document.querySelectorAll('td'));
        arr.forEach((el) => {
          if (el.textContent === this.moment.format('D') && monthEl === (this.moment.format('M') - 1) && year === Number((this.moment.format('YYYY')))) {
            el.classList.add('today');
          }
          if (Number(el.textContent) < Number(this.moment.format('D')) && monthEl === (this.moment.format('M') - 1) && year === Number((this.moment.format('YYYY')))) {
            el.classList.add('inactive');
          }
          if (monthEl < (this.moment.format('M') - 1) && year <= Number((this.moment.format('YYYY')))) {
            el.classList.add('inactive');
          }
          if (year < Number((this.moment.format('YYYY')))) {
            el.classList.add('inactive');
          }
        });
      }
    
      getDay(dateF) {
        let day = dateF.getDay();
        if (day === 0) day = 7;
        return day - 1;
      }
    
      delete() {
        document.querySelector('.calendar__header').remove();
        document.querySelector('table').remove();
      }
    }
