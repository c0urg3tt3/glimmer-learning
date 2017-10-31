import Component, { tracked } from '@glimmer/component';

import {
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
} from './actions'

import dispatch, { initialState } from './reducer'

const YEARS_LENGTH = 20

/**
 * display an input f date type with a custom datepicker
 * to unify user experience over platforms
 *
 * @class DatePicker
 * @extends Component
**/
export default class DatePicker extends Component {
  args: {
    year?: number,
    minYear?: number,
    maxYear?: number,
    month?: number,
    minMonth?: number,
    maxMonth?: number,
    day?: number,
    minDay?: number,
    maxDay?: number,
    startOnMonday?: boolean,
    closeOnBlur?: boolean,
  }

  @tracked state = initialState

  _months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'décembre']

  months = new Array(12).fill(null)

  yearsIndexMin = 0

  yearsIndexMax = 0

  constructor(options) {
    super(options)

    const { state, args } = this
    const { months, _months, _handleBlur } = this

    this._dispatch(initState, args)

    const offsetMax = (state.maxYear - state.minYear - (state.maxYear % YEARS_LENGTH) - (state.minYear % YEARS_LENGTH)) / YEARS_LENGTH
    this.yearsIndexMax = Math.ceil(offsetMax)

    this.months = months.map((item, idx) => ({
      month: _months[idx],
      monthIndex: idx,
      disabled: false
    }))

    this._dispatch(cacheMonths, 'month-fr', this.months)

    this._handleBlur = _handleBlur.bind(this)
  }

  /**
   * update the state with dispatch action result
   *
   * @private
   * @function _dispatch
   * @return {void}
  **/
  private _dispatch(action, ...params) {
    this.state = dispatch(this.state, action, ...params)
  }

  /**
   * if global listener as been set,
   * add global event listener for fake blur
   *
   * @private
   * @function _addBlurListener
   * @return {void}
  **/
  private _addBlurListener() {
    if (!this.state.hasBlurListener) {
      window.addEventListener('click', this._handleBlur)
      this._dispatch(toggle, 'hasBlurListener')
    }
  }

  /**
   * if global listener as been set,
   * remove global event listener for fake blur
   *
   * @private
   * @function _removeBlurListener
   * @return {void}
  **/
  private _removeBlurListener() {
    if (this.state.hasBlurListener) {
      window.addEventListener('click', this._handleBlur)
      this._dispatch(toggle, 'hasBlurListener')
    }
  }

  /**
   * open date-picker popup
   *
   * if closeOnBlur is true,
   * add global event listener for fake blur
   *
   * @private
   * @function _handleFocus
   * @return {void}
  **/
  private _handleFocus() {
    this._dispatch(handleFocus)

    if (this.state.closeOnBlur) {
      this._addBlurListener()
    } else {
      this._dispatch(toggle, 'hasBlurListener')
    }
  }

  /**
   * close date-picker popup
   *
   * if closeOnBlur is true,
   * remove global event listener for fake blur
   *
   * @private
   * @function _handleBlur
   * @return {void}
  **/
  private _handleBlur() {
    this._dispatch(handleBlur)

    if (this.state.closeOnBlur) {
      this._removeBlurListener()
    } else {
      this._dispatch(toggle, 'hasBlurListener')
    }
  }

  /** * @property {string} inputValue the value of the input **/
  @tracked('state') get inputValue() {
    const {day, month, year} = this.state
    const _day = `0${day}`.slice(-2)
    const _month =  `0${month + 1}`.slice(-2)

    return `${year}-${_month}-${_day}`
  }

  /** * @property {Array} days  a range of 42 days between the currently selected year, month **/
  @tracked('state') get days() {
    const { year, month, startOnMonday } = this.state
    const cacheKey = `${year}-${month}[som:${startOnMonday}]`

    if (!this.state.days[cacheKey]) {
      this._dispatch(cacheDays, cacheKey, this.state)
    }

    return this.state.days[cacheKey]
  }

  /** * @property {string} monthToString **/
  @tracked('state') get monthToString() {
    return this._months[this.state.month]
  }

  /** * @property {number} yearsIndex the current virtual index of the years picker **/
  @tracked('state') get yearsIndex() {
    const { year, minYear } = this.state
    const yearModulo = year % YEARS_LENGTH
    const offset = (year - minYear - yearModulo) / YEARS_LENGTH

    return Math.ceil(offset)
  }

  /** * @property {Array} years a range of 20 years between minYear and maxYear based on the currently selected year **/
  @tracked('state') get years() {
    const { year: currentYear, minYear, maxYear } = this.state
    const yearModulo = currentYear % YEARS_LENGTH
    const year = currentYear - yearModulo
    const cacheKey = year

    if (!this.state.years[cacheKey]) {
      this._dispatch(cacheYears, cacheKey, { year, minYear, maxYear })
    }

    return this.state.years[cacheKey]
  }

  /** * @property {Object} firstYear the first year in years **/
  @tracked('years') get firstYear() {
    return this.years[0]
  }

  /** * @property {Object} lastYear the last year in years **/
  @tracked('years') get lastYear() {
    return this.years[YEARS_LENGTH-1]
  }

  /**
   * stop propagation of click event inside of date-picker,
   * especially usefull when closeOnBlur is used to ensure no click in picker will close the popup.
   *
   * @function handleInternalClick
   * @return {void}
  **/
  handleInternalClick(event) {
    event.stopPropagation()
  }

  /**
   * toggle the date-picker properties
   *
   * @function togglePickerProperties
   * @return {void}
  **/
  togglePickerProperties(...names) {
    if (names[names.length-1] instanceof MouseEvent) {
      names.pop()
    }

    names.forEach(name => this._dispatch(toggle, name))
  }

  /**
   * toggle the date-picker popup visibility
   *
   * @function togglePicker
   * @return {void}
  **/
  togglePicker() {
    if (!this.state.hasBlurListener) {
      this._handleFocus()
    } else {
      this._handleBlur()
    }
  }

  /**
   * update the year value
   * close the year picker and open the month picker
   *
   * @function selectYear
   * @param {string|number} year the year of the date
   * @return {void}
  **/
  selectYear(year) {
    this._dispatch(updateYear, year)
    this.togglePickerProperties('showYearPicker', 'showMonthPicker')
  }

  /**
   * update the month value
   * close the month picker and open the day picker
   *
   * @function selectMonth
   * @param {string|number} month the month of the date
   * @return {void}
  **/
  selectMonth(month) {
    this._dispatch(updateMonth, month)
    this.togglePickerProperties('showMonthPicker', 'showDayPicker')
  }

  /**
   * update the day value
   * close the day picker
   *
   * @function selectDay
   * @param {string|number} day the day of the date
   * @return {void}
  **/
  selectDay(day) {
    this._dispatch(updateDay, day)
    this._handleBlur()
  }

  /**
   * if superior to min year
   * update the years index minus one
   *
   * @function prevYears
   * @return {void}
  **/
  prevYears() {
    const { years, state } = this
    const { year, minYear } = state
    const prevYear = years[0].year - 1

    if (prevYear > minYear) {
      this._dispatch(updateYear, prevYear)
    }
  }

  /**
   * if inferior to max year update the year
   *
   * @function nextYears
   * @return {void}
  **/
  nextYears() {
    const { years, state } = this
    const { year, maxYear } = state
    const nextYear = years[YEARS_LENGTH-1].year + 1

    if (nextYear < maxYear) {
      this._dispatch(updateYear, nextYear)
    }
  }

  /**
   * if superior or equal to min year
   * update the year index minus one
   *
   * @function prevYear
   * @return {void}
  **/
  prevYear() {
    const { year, minYear } = this.state
    const prevYear = year - 1

    if (prevYear >= minYear) {
      this._dispatch(updateMonth, 11)
      this._dispatch(updateYear, prevYear)
    }
  }

  /**
   * if inferior or equal to max year
   * update the year index plus one
   *
   * @function nextYear
   * @return {void}
  **/
  nextYear() {
    const { year, maxYear } = this.state
    const nextYear = year + 1

    if (nextYear <= maxYear) {
      this._dispatch(updateMonth, 0)
      this._dispatch(updateYear, nextYear)
    }
  }

  /**
   * if superior or equal to min month (0)
   * update the month index minus one
   *
   * @function prevMonth
   * @return {void}
  **/
  prevMonth() {
    const { month, minYear } = this.state
    const prevMonth = month - 1

    if (prevMonth >= 0) {
      this._dispatch(updateMonth, prevMonth)
    } else {
      this.prevYear()
    }
  }

  /**
   * if inferior or equal to max month (11)
   * update the month index plus one
   *
   * @function nextMonth
   * @return {void}
  **/
  nextMonth() {
    const { month } = this.state
    const nextMonth = month + 1

    if (nextMonth <= 11) {
      this._dispatch(updateMonth, nextMonth)
    } else {
      this.nextYear()
    }
  }
}
