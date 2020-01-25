import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modals/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.9,
  meat: 1.3
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://burgerapp-37a2c.firebaseio.com/ingredients.json').then(res => {
      this.setState({ ingredients: res.data });
    }).catch(error => {
      this.setState({ error: true });
    })
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
    this.setState({ loading: true });
    const order = {
      Ingredients: this.state.ingredients,
      Price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Satyam Gaurav',
        address: {
          street: 'c lal',
          zipCode: '110019',
          country: 'India'
        },
        email: 'satyamgaurav26@gmail.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order).then(response => {
      this.setState({ loading: false, purchasing: false });
    }).catch(error => {
      console.log(error);
      this.setState({ loading: false, purchasing: false });
    })
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = <Spinner />

    let orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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

      orderSummary = <OrderSummary ingredients={this.state.ingredients} cancel={this.removePurchaseHandler} continue={this.continueShop} price={this.state.totalPrice} />;

    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    let mainContent = (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.removePurchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
    if (this.state.error) {
      mainContent = <p style={{ textAlign: 'center' }}>Can't load App. Check Internet</p>
    }

    return (
      <div>
        {mainContent}
      </div>

    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);