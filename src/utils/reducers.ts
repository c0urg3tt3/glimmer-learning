import { combineReducers } from 'redux'
import historyReducer from '../ui/components/g-router-redux/-utils/reducer'
import demoReducer from '../ui/components/glimmer-learning/demo-container/-utils/reducer'
import counterReducer from '../ui/components/glimmer-learning/day-three/day-three-demo/counter-container/-utils/reducer'

export default combineReducers({
  history: historyReducer,
  demo: demoReducer,
  counter: counterReducer
})
