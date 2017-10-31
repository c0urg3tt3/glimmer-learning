import Component, { tracked } from '@glimmer/component';

const  beforeDays = (year, month, startOnMonday) => {
  const previousMonthLength = new Date(year, month, 0).getDate()
  let offset = new Date(year, month, 1).getDay()

  if (startOnMonday) {
    offset = ((offset - 1) >= 0) ? (offset - 1) : 6
  }

  let day = previousMonthLength - offset + 1

  return new Array(offset).fill(null).map((item, idx) => ({
    day: day + idx,
    disabled: "disabled"
  }))
}

const currentDays = (args) => {
  const { year, month, minYear, maxYear, minMonth, maxMonth, minDay, maxDay, monthLength } = args
  return new Array(monthLength).fill(null).map((item, idx) => ({
    day: idx + 1,
    disabled: (year === minYear && month === minMonth && idx + 1 < minDay)
      || (year === maxYear && month === maxMonth && idx + 1 > maxDay)
  }))
}

const afterDays = (previousDaysLength, monthLength) => {
  const offset = 42 - monthLength - previousDaysLength

  return new Array(offset).fill(null).map((item, idx) => ({
    day: idx + 1,
    disabled: "disabled"
  }))
}

export default class DayPicker extends Component {
  @tracked('args')
  get days() {
    const { year, month, startOnMonday, minYear, maxYear, minMonth, maxMonth, minDay, maxDay } = this.args
    const monthLength = new Date(year, month + 1, 0).getDate()
    const _beforeDays = beforeDays(year, month, startOnMonday)
    const _days = currentDays({monthLength, year, month, minYear, maxYear, minMonth, maxMonth, minDay, maxDay})
    const _afterDays = afterDays(_beforeDays.length, monthLength)
    const days = [
      ..._beforeDays,
      ..._days,
      ..._afterDays
    ]
    return days
  }
};
