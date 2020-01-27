import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Styles from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zip: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const order = {
      Ingredients: this.props.ingredients,
      Price: this.props.price,
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
      this.setState({ loading: false });
      alert('ordered successfully');
      this.props.history.push('/');
    }).catch(error => {
      console.log(error);
      this.setState({ loading: false });
    })
  }

  render() {

    let form = <Spinner />
    if (!this.state.loading) {
      form = (<form>
        <input className={Styles.Input} type="text" name="name" placeholder="Your Name" />
        <input className={Styles.Input} type="text" name="email" placeholder="Your Email" />
        <input className={Styles.Input} type="text" name="street" placeholder="Street" />
        <input className={Styles.Input} type="text" name="zip" placeholder="zipcode" />
        <Button type="Success" clicked={this.orderHandler}>Submit</Button>
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