import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredients = (ingName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  }
}
export const deleteIngredients = (ingName) => {
  return {
    type: actionTypes.DELETE_INGREDIENT,
    ingredientName: ingName
  }
}

export const setIngredients = (ingredients)=> {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
  }
}

export const fetchTransactionFailed = ()=>{
  return {
    type: actionTypes.FETCH_TRANSACTION_FAILED,
    error: true
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('https://burgerapp-37a2c.firebaseio.com/ingredients.json').then(response => {
      dispatch(setIngredients(response.data))
    }).catch(error => {
      dispatch(fetchTransactionFailed())
    })
  }
}