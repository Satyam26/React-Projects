import * as actionTypes from '../actions/actionTypes';

// order = [{id: id, orderDetails: orderdetails}]
const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  orderLoading: false
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASED_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
        purchased: true
      }
      return {
        ...state,
        purchased: true,
        orders: state.orders.concat(newOrder),
        loading: false
      }
    case actionTypes.PURCHASE_BURGER_FAILED:
      return {
        ...state,
        loading: false
      }
    case actionTypes.LOADING_PURCHASE_BURGER:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orders: action.orderArray
      }
    case actionTypes.FETCH_ORDER_FAILED:
      return {
        ...state,
        orderLoading: false
      }
    case actionTypes.ORDER_LOADING_START:
      return {
        ...state,
        orderLoading: true
      }
    default:
      return state;
  }
}

export default orderReducer;