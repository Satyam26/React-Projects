import React, { Component } from 'react';

import axios from '../../axios-order'
import Styles from './Orders.module.css';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }


  componentDidMount() {
    axios.get('/orders.json').then(response => {
      const fetchedOrders = [];

      for (const orderKey in response.data) {
        fetchedOrders.push({
          ...response.data[orderKey], id: orderKey
        })
      }
      this.setState({ orders: fetchedOrders })
    })
      .catch(error => { console.log(error) })
      .finally(() => {
        this.setState({ loading: false })
      })
  }



  render() {

    let listOfOrders = this.state.orders.map(order => {
      return <Order ingredients={order.Ingredients} key={order.id} price={order.Price} />
    });

    if (this.state.loading) {
      listOfOrders = <Spinner />
    }



    return (
      <div className={Styles.OrdersCSS}>
        {listOfOrders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);