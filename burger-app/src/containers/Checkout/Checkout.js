import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../containers/Checkout/ContactData/ContactData'

class Checkout extends Component {


  cancelCheckout = () => {
    this.props.history.goBack();
  }

  checkoutContinued = () => {
    this.props.history.replace('/checkout/contact-details');
  }

  render() {
    let summary = <Redirect to="/" />
    const purchasedInit = this.props.purchased ? <Redirect to="/" /> : null;
    if (this.props.ings) {
      summary = (
        <div>
          {purchasedInit}
          <CheckoutSummary ingredients={this.props.ings} checkoutCancelled={this.cancelCheckout} checkoutContinued={this.checkoutContinued} />
          <Route path={this.props.match.path + '/contact-details'} component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}



const mapStateToProps = state => {
  return {
    ings: state.burgerReducer.ingredients,
    tPrice: state.burgerReducer.totalPrice,
    purchased: state.orderReducer.purchased
  }
}

export default connect(mapStateToProps)(Checkout);