import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modals/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9,
  meat: 1.3
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {
    const purchasableItems = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((sum, el) => { return sum + el; }, 0);
    let purchasable = this.state.purchasable;
    purchasable = purchasableItems > 0;
    this.setState({ purchasable: purchasable });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const oldPrice = this.state.totalPrice;
    const updatedCount = oldCount + 1;
    const updatedPrice = oldPrice + INGREDIENT_PRICES[type];
    const updatedState = { ...this.state }
    updatedState.ingredients[type] = updatedCount;
    updatedState.totalPrice = updatedPrice;
    this.setState(updatedState);
    this.updatePurchaseState(updatedState.ingredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const oldPrice = this.state.totalPrice;
    const updatedCount = oldCount - 1;
    if (updatedCount < 0) {
      return;
    }
    const updatedPrice = oldPrice - INGREDIENT_PRICES[type];
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    this.setState({ ingredients: updatedIngredients, totalPrice: updatedPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  removePurchaseHandler = () => {
    this.setState({ purchasing: false });
  }

  continueShop = () => {
    alert('SUCCESS !!! Thanks for your order');
    this.removePurchaseHandler();
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.removePurchaseHandler}><OrderSummary ingredients={this.state.ingredients} cancel={this.removePurchaseHandler} continue={this.continueShop} price={this.state.totalPrice} /></Modal>
        <div>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <div>
          <BuildControls price={this.state.totalPrice.toFixed(2)} add={this.addIngredientHandler} remove={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            showModal={this.purchaseHandler} />
        </div>
      </Aux>
    );
  }
}

export default BurgerBuilder;