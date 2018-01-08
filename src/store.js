// You can import combineReducers
import { createStore, combineReducers, applyMiddleware } from 'redux'

import promiseMiddleware from 'redux-promise-middleware'

import user from './ducks/user'

// And use combineReducers({user, etc})
const store = createStore(combineReducers({
  user
}), applyMiddleware(promiseMiddleware()))

export default store