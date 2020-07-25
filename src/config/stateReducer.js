export default function (state, action) {
  switch (action.type) {
    case 'setMeals': {
      return {
        ...state,
        meals: action.data
      };
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