// REQUIRE DEPENDENCIES
import axios from 'axios'

//INITIAL STATE
const initialState = {
  user: {},
  character: {},
  isLoading: false,
  didError: false  
}

//ACTION TYPES
// USER
const RETRIEVE_USER = "RETRIEVE_USER"
// CHARACTER
const RETRIEVE_CHARACTER = "RETRIEVE_CHARACTER"

//ACTION CREATORS

// USER
export function retrieveUser(authId) {
  return {
    type: RETRIEVE_USER,
    payload: axios
    .get(`http://localhost:3005/api/${authId}`)
    .then(response => response.data)
    .catch(console.log)
  }
}

// CHARACTER
export function retrieveCharacter(authId) {
  return {
    type: RETRIEVE_CHARACTER,
    payload: axios
    .get(`http://localhost:3005/api/character/${authId}`)
    .then(response => response.data)
    .catch(console.log)
  }
}

//REDUCER (USER)
export default function user(state = initialState, action = {}) {
  switch(action.type) {
    // USER
    case `${RETRIEVE_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true })

    case `${RETRIEVE_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      })

    case `${RETRIEVE_USER}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      })
      // CHARACTER
      case `${RETRIEVE_CHARACTER}_PENDING`:
      return Object.assign({}, state, { isLoading: true })

    case `${RETRIEVE_CHARACTER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        character: action.payload
      })

    case `${RETRIEVE_CHARACTER}_REJECTED`:
      return Object.assign({}, state, {
        isLoading: false,
        didError: true
      })
    
    default:
      return state
  }
}