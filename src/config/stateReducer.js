import {
  setLoggedInUser,
} from "../services/authServices"

export default function (state, action) {
  switch (action.type) {
    case 'setMeals': {
      return {
        ...state,
        meals: action.data
      };
    }
    case "setLoggedInUser": {
      setLoggedInUser(action.data)
      return {
        ...state,
        loggedInUser: action.data
      }
    }
    case "setError": {
      return {
        ...state,
        error: action.data
      }
    }
    case "setInfo": {
      return {
        ...state,
        info: action.data
      }
    }
    default:
      return state
  }
}