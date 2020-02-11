import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}
export const purchaseBurgerFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    error: error
  }
}

export const loadingPurchaseBurger = () => {
  return {
    type: actionTypes.LOADING_PURCHASE_BURGER
  }
}

export const initPurchaseBurger = (orderData, token) => {
  return dispatch => {
    axios.post('/orders.json?auth=' + token, orderData)
      .then(response => {
        console.log(response);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFailed(error))
      })
  }
}

export const purchasedInit = () => {
  return {
    type: actionTypes.PURCHASED_INIT
  }
}

export const fetchOrderSuccess = (orderArray) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orderArray: orderArray
  }
}

export const fetchOrderFailed = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error: error
  }
}

export const fetchOrderStart = (token, userId) => {
  return dispatch => {
    const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('/orders.json' + queryParams).then(response => {
      const fetchedOrders = [];

      for (const orderKey in response.data) {
        fetchedOrders.push({
          ...response.data[orderKey], id: orderKey
        })
      }

      dispatch(fetchOrderSuccess(fetchedOrders));
    })
      .catch(error => { dispatch(fetchOrderFailed(error)) });
  }
}

export const orderLoadingStart = () => {
  return {
    type: actionTypes.ORDER_LOADING_START
  }
}