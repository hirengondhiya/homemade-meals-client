export default function (state, action) {
  switch (action.type) {
    case 'setMeals': {
      return {
        ...state,
        meals: action.data
      };
    }
    case 'setOrders': {
      return {
        ...state,
        orders: action.data
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
    case "setOrdersLoadFinished": {
      return {
        ...state,
        ordersLoadFinished: action.data
      }
    }
    case "setMealsLoadFinished": {
      return {
        ...state,
        mealsLoadFinished: action.data
      }
    }
    default:
      return state
  }
}