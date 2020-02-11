import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modals/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/combinedExport';


export class BurgerBuilder extends Component {

  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => { return sum + el; }, 0);

    return sum > 0;

  }

  purchaseHandler = () => {
    if (!this.props.isAuth) {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    } else {
      this.setState({ purchasing: true });
    }
  }

  removePurchaseHandler = () => {
    this.setState({ purchasing: false });
  }

  continueShop = () => {
    this.props.onPurchasedInit();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <Spinner />

    let orderSummary = null;

    if (this.props.ings) {
      burger = (
        <Aux>
          <div>
            <Burger ingredients={this.props.ings} />
          </div>
          <div>
            <BuildControls price={this.props.tPrice.toFixed(2)}
              add={this.props.addIngredient}
              remove={this.props.removeIngredient}
              disabledInfo={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              isAuth={this.props.isAuth}
              showModal={this.purchaseHandler} />
          </div>
        </Aux>
      );

      orderSummary = <OrderSummary ingredients={this.props.ings} cancel={this.removePurchaseHandler} continue={this.continueShop} price={this.state.totalPrice} />;

    }

    let mainContent = (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.removePurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
    if (this.props.error) {
      mainContent = <p style={{ textAlign: 'center' }}>Can't load App. Check Internet</p>
    }

    return (
      <div>
        {mainContent}
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerReducer.ingredients,
    tPrice: state.burgerReducer.totalPrice,
    error: state.burgerReducer.error,
    isAuth: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: (ingredientName) =>
      dispatch(actionCreators.addIngredients(ingredientName)),

    removeIngredient: (ingredientName) =>
      dispatch(actionCreators.deleteIngredients(ingredientName)),

    initIngredients: () =>
      dispatch(actionCreators.initIngredients()),

    onPurchasedInit: () => dispatch(actionCreators.purchasedInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));