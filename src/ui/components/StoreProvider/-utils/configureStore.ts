import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'

const middlewares = [thunk]

const devtools = (<any>window).__REDUX_DEVTOOLS_EXTENSION__
               ? (<any>window).__REDUX_DEVTOOLS_EXTENSION__()
               : f => f

const enhancer = compose(applyMiddleware(...middlewares), devtools)

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, enhancer)
}
