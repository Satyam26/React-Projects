import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 4,
  building: false
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9,
  meat: 1.3
}

const rootReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        building: true,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }

    case actionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        totalPrice: 4,
        ingredients: action.ingredients,
        error: false,
        building: false
      }
    case actionTypes.FETCH_TRANSACTION_FAILED:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }

}

export default rootReducer;