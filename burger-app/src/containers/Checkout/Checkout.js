import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData'

class Checkout extends Component {

  state = {
    ingredients: {},
    price: 0
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let price = 0;
    const ingredients = {}
    for (let param of query.entries()) {
      if (param[0] === 'totalPrice') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, price: price });

  }

  cancelCheckout = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-details');
  }


  render() {

    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.cancelCheckout} checkoutContinued={this.checkoutContinued} />
        <Route path={this.props.match.path + '/contact-details'} render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...this.props} />)} />
      </div>
    );
  }
}
export default Checkout;