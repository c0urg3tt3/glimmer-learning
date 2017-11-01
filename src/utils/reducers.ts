import { combineReducers } from 'redux'
import historyReducer from '../ui/components/RouterRedux/-utils/reducer'
import demoReducer from '../ui/components/GlimmerLearning/DemoContainer/-utils/reducer'
import counterReducer from '../ui/components/GlimmerLearning/DayThree/DayThreeDemo/CounterContainer/-utils/reducer'

export default combineReducers({
  history: historyReducer,
  demo: demoReducer,
  counter: counterReducer
})
