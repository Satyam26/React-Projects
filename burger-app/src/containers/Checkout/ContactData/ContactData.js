import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actionCreators from '../../../store/actions/combinedExport';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../shared/utility';

class ContactData extends Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
          name: 'name',
          label: 'name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        shouldValidate: true
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail',
          name: 'email',
          label: 'email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        shouldValidate: true
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address',
          name: 'address',
          label: 'address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        shouldValidate: true
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'zipcode',
          name: 'zipcode',
          label: 'zipcode'
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        shouldValidate: true
      },
      delivery: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'normal', displayValue: 'Normal' },
          ]
        },
        value: "normal",
        valid: true,
        touched: false,
        shouldValidate: false
      }
    },
    loading: false,
    formValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    let validity = true;
    this.setState({ loading: true });
    const formData = {}
    for (let formElement in this.state.orderForm) {

      formData[formElement] = {
        value: this.state.orderForm[formElement].value
      }
    }

    if (validity) {
      const order = {
        Ingredients: this.props.ings,
        Price: this.props.price,
        orderDetails: formData,
        userId: this.props.userId
      }

      // code for asynchronous call

      this.props.initPurchaseBurger(order, this.props.token);

    } else {
      alert('please end validation');
      this.setState({ loading: false });
    }

  }

  inputChangeHandler = (event, id) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[id] };
    updatedElement.value = event.target.value;
    updatedElement.touched = true
    if (updatedElement.shouldValidate) {
      updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation);
    }
    updatedOrderForm[id] = updatedElement;

    let formValid = true;
    for (let formElement in updatedOrderForm) {
      formValid = updatedOrderForm[formElement].valid === true && formValid;
    }

    this.setState({ formValid: formValid });
    this.setState({ orderForm: updatedOrderForm })

  }

  render() {

    let formElementArray = [];
    for (const element in this.state.orderForm) {
      formElementArray.push({
        id: element,
        configDetails: this.state.orderForm[element],

      })
    }

    let form = <Spinner />
    if (!this.props.loading) {
      form = (<form onSubmit={this.orderHandler}>

        {formElementArray.map(element => {
          return <Input key={element.id}
            element_type={element.configDetails.elementType}
            element_config={element.configDetails.elementConfig}
            value={element.configDetails.value}
            changed={(event) => this.inputChangeHandler(event, element.id)}
            shouldValidate={element.configDetails.validation}
            touched={element.configDetails.touched}
            valid={element.configDetails.valid} />
        })}

        <Button type="Success" disabled={!this.state.formValid} >Submit</Button>
      </form>);
    }

    return (
      <div className={Styles.ContactData}>
        <h3>Please enter your details</h3>
        {form}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    loading: state.orderReducer.loading,
    token: state.authReducer.token,
    userId: state.authReducer.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initPurchaseBurger: (orderData, token) => { dispatch(actionCreators.initPurchaseBurger(orderData, token)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));