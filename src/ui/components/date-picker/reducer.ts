
import {
  INIT_STATE,
  TOGGLE,
  HANDLE_FOCUS,
  HANDLE_BLUR,
  UPDATE_YEAR,
  UPDATE_MONTH,
  UPDATE_DAY,
  CACHE_YEARS,
  CACHE_MONTHS,
  CACHE_DAYS
} from './actions'

export const initialState = {
  showDayPicker: false,
  showMonthPicker: false,
  showYearPicker: false,
  year: 1970,
  minYear: 1902,
  maxYear: 2032,
  years: {},
  month: 0,
  minMonth: 0,
  maxMonth: 11,
  months: {},
  day: 1,
  minDay: 1,
  maxDay: 31,
  days: {},
  startOnMonday: true,
  closeOnBlur: false,
  hasBlurListener: false
}

const cacheReducer = (state, action) => {
  switch (action.type) {
    case CACHE_YEARS:
    case CACHE_MONTHS:
    case CACHE_DAYS:
      return {
        ...state,
        [action.key]: action.cache
      }
    default:
      return state
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return {
        ...state,
        [action.name]: !state[action.name]
      }
    case HANDLE_FOCUS:
      return {
        ...state,
        showDayPicker: true,
        showMonthPicker: false,
        showYearPicker: false
      }
    case HANDLE_BLUR:
      return {
        ...state,
        showDayPicker: false,
        showMonthPicker: false,
        showYearPicker: false
      }
    case UPDATE_YEAR:
      return {
        ...state,
        year: action.year
      }
    case UPDATE_MONTH:
      return {
        ...state,
        month: action.month
      }
    case UPDATE_DAY:
      return {
        ...state,
        day: action.day
      }
    case CACHE_YEARS:
      return {
        ...state,
        years: cacheReducer(state.years, action)
      }
    case CACHE_MONTHS:
      return {
        ...state,
        months: cacheReducer(state.months, action)
      }
    case CACHE_DAYS:
      return {
        ...state,
        days: cacheReducer(state.days, action)
      }
    case INIT_STATE:
      return {
        ...state,
        year: action.year || state.year,
        minYear: action.minYear || state.minYear,
        maxYear: action.maxYear || state.maxYear,
        month: action.month || state.month,
        minMonth: action.minMonth || state.minMonth,
        maxMonth: action.maxMonth || state.maxMonth,
        day: action.day || state.day,
        minDay: action.minDay || state.minDay,
        maxDay: action.maxDay || state.maxDay,
        startOnMonday: action.startOnMonday || state.startOnMonday,
        closeOnBlur: action.closeOnBlur || state.closeOnBlur
      }
    default:
      return state
  }
}

export default function dispatch(state, action, ...params) {
  const _action = action(...params)
  // console.log(`[dispatch]`, {..._action})
  const _state =  reducer(state, _action)
  // console.log('[state]', {state, _state})
  return _state
}
