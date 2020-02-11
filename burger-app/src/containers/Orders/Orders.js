import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../axios-order'
import Styles from './Orders.module.css';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/combinedExport';

class Orders extends Component {

  componentDidMount() {
    this.props.onLoadingStart();
    this.props.onFetchingOrder(this.props.token, this.props.userId);
  }


  render() {
    let listOfOrders = <p> Sorry, no orders found</p>;

    if (this.props.orders) {
      listOfOrders = this.props.orders.map(order => {
        return <Order ingredients={order.Ingredients} key={order.id} price={order.Price} />
      });
    }

    if (this.props.loading) {
      listOfOrders = <Spinner />
    }

    return (
      <div className={Styles.OrdersCSS}>
        {listOfOrders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducer.orders,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadingStart: () => dispatch(actionCreators.orderLoadingStart()),
    onFetchingOrder: (token, userId) => dispatch(actionCreators.fetchOrderStart(token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));