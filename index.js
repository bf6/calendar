function getWeekDays (locale) {
  const refSunday = new Date(Date.UTC(2019, 0, 7))
  let weekDays = []
  for (i = 0; i < 7; i++) {
    weekDays.push(refSunday.toLocaleDateString(locale, { weekday: 'short' }))
    refSunday.setDate(refSunday.getDate() + 1)
  }
  return weekDays
}

function getCalendarRows (year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  let rows = []
  let currentRow = []
  let currentDate

  for (i = 1; i < daysInMonth + 1; i++) {
    currentRow.push(i)
    currentDate = new Date(year, month, i)
    if (currentDate.getDay() === 6 ||  i === daysInMonth) {
      rows.push(currentRow)
      currentRow = []
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

function formatTableHeader (locale) {
  const formattedWeekDays = getWeekDays(locale).map(d => {
    return `<th>${d[0]}</th>`
  })
  return `<tr>${formattedWeekDays.join('')}</tr>`
}

function formatTableRows (year, month) {
  let calendarRows = getCalendarRows(year, month)

  calendarRows = calendarRows.map((row, idx) => {
    if (idx === 0 && row.length < 7) {
      row = [...Array(7-row.length).fill('')].concat(row) // Left pad the first row
    } else if (idx === calendarRows.length - 1 && row.length < 7) {
      row = row.concat([...Array(7-row.length).fill('')]) // Right pad the last row
    }

    let formattedCells = []
    for (let day of row) {
      formattedCells.push(`<td>${day}</td>`)
    }
    return formattedCells
  })

  let formattedRows = []
  for (let row of calendarRows) {
    formattedRows.push(`<tr>${row.join('')}</tr>`)
  }
  return formattedRows.join('')
}

function renderCalendar (date = new Date(), locale = 'en-us') {

  let month = date.getMonth()
  let monthName = date.toLocaleDateString(locale, { month: 'long' })
  let year = date.getFullYear()

  let cal = document.getElementById('calendar')
  let monthElem = document.getElementById('month')

  monthElem.innerHTML = `${monthName} ${year}`
  cal.innerHTML = `
    <table>
      ${formatTableHeader(locale)}
      ${formatTableRows(year, month)}
    </table>
  `
}

function nextMonth () {
  currentDate.setMonth(currentDate.getMonth() + 1)
  renderCalendar(currentDate)
}

function previousMonth () {
  currentDate.setMonth(currentDate.getMonth() - 1)
  renderCalendar(currentDate)
}

let locale = 'en-us'
let currentDate = new Date()

renderCalendar(currentDate, locale)