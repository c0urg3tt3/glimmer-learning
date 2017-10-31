const YEARS_LENGTH = 20

export const INIT_STATE = 'INIT_STATE'
export const initState = (args) => ({
  type: INIT_STATE,
  ...args
})

export const TOGGLE = 'TOGGLE'
export const toggle = (name) => ({
  type: TOGGLE,
  name
})

export const HANDLE_FOCUS = 'HANDLE_FOCUS'
export const handleFocus = () => ({
  type: HANDLE_FOCUS
})

export const HANDLE_BLUR = 'HANDLE_BLUR'
export const handleBlur = () => ({
  type: HANDLE_BLUR
})

export const UPDATE_YEAR = 'UPDATE_YEAR'
export const updateYear = (year) => ({
  type: UPDATE_YEAR,
  year
})

export const UPDATE_MONTH = 'UPDATE_MONTH'
export const updateMonth = (month) => ({
  type: UPDATE_MONTH,
  month
})

export const UPDATE_DAY = 'UPDATE_DAY'
export const updateDay = (day) => ({
  type: UPDATE_DAY,
  day
})

export const CACHE_YEARS = 'CACHE_YEARS'
export const cacheYears = (cacheKey, params) => {
  const { year, minYear, maxYear } = params
  const years = new Array(YEARS_LENGTH).fill(null).map((item, index) => {
    const _year = year + index
    return {
      year: _year,
      disabled: (_year < minYear || _year > maxYear)
    }
  })

  return {
    type: CACHE_YEARS,
    key: cacheKey,
    cache: years
  }
}

export const CACHE_MONTHS = 'CACHE_MONTHS'
export const cacheMonths = (key, months) => ({
  type: CACHE_MONTHS,
  key,
  cache: months
})

export const CACHE_DAYS = 'CACHE_DAYS'
export const cacheDays = (cacheKey, params) => {
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

  const afterDays = (previousDaysLength, monthLength) => {
    const offset = 42 - monthLength - previousDaysLength

    return new Array(offset).fill(null).map((item, idx) => ({
      day: idx + 1,
      disabled: "disabled"
    }))
  }

  const { year, month, startOnMonday, minYear, maxYear, minMonth, maxMonth, minDay, maxDay } = params
  const _beforeDays = beforeDays(year, month, startOnMonday)
  const monthLength = new Date(year, month + 1, 0).getDate()
  const _days = new Array(monthLength).fill(null).map((item, idx) => ({
    day: idx + 1,
    disabled: (year === minYear && month === minMonth && idx + 1 < minDay)
      || (year === maxYear && month === maxMonth && idx + 1 > maxDay)
  }))
  const _afterDays = afterDays(_beforeDays.length, monthLength)
  const days = [
    ..._beforeDays,
    ..._days,
    ..._afterDays
  ]

  return {
    type: CACHE_DAYS,
    key: cacheKey,
    cache: days
  }
}

export default {
  // actions type
  INIT_STATE,
  TOGGLE,
  HANDLE_FOCUS,
  HANDLE_BLUR,
  UPDATE_YEAR,
  UPDATE_MONTH,
  UPDATE_DAY,
  CACHE_YEARS,
  CACHE_MONTHS,
  CACHE_DAYS,
  // actions
  initState,
  toggle,
  handleFocus,
  handleBlur,
  updateYear,
  updateMonth,
  updateDay,
  cacheYears,
  cacheMonths,
  cacheDays
}
