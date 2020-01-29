import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
          required: true
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

  checkValidity(value, rules) {
    let isValid = false;

    if (rules.required) {
      isValid = value.trim() !== '';
    }

    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();
    let validity = true;
    this.setState({ loading: true });
    const formData = {}
    for (let formElement in this.state.orderForm) {

      console.log(this.state.orderForm[formElement].valid);
      formData[formElement] = {
        value: this.state.orderForm[formElement].value
      }
    }

    if (validity) {
      const order = {
        Ingredients: this.props.ingredients,
        Price: this.props.price,
        orderDetails: formData,
      }

      axios.post('/orders.json', order)
        .then(response => {
          this.setState({ loading: false });
          this.props.history.push('/');
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: false });
        })
    } else {
      alert('please end validation');
      this.setState({ loading: false });
    }

  }

  inputChangeHandler = (event, id) => {
    console.log(event.target.value);
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedOrderForm[id] };
    updatedElement.value = event.target.value;
    updatedElement.touched = true
    if (updatedElement.shouldValidate) {
      updatedElement.valid = this.checkValidity(updatedElement.value, updatedElement.validation);
    }
    updatedOrderForm[id] = updatedElement;

    let formValid = true;
    for (let formElement in updatedOrderForm) {
      formValid = updatedOrderForm[formElement].valid === true && formValid;
      console.log(formValid);
    }

    this.setState({ formValid: formValid });
    console.log(this.state.formValid);
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
    console.log(!this.state.formValid)

    let form = <Spinner />
    if (!this.state.loading) {
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
export default ContactData;