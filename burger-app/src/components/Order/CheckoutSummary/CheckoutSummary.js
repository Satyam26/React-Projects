import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import Styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => {

  return (
    <div className={Styles.CheckoutSummary}>
      <h2>Your burger seems tasty</h2>
      <div className={Styles.Burger}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button type="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button type="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
}

export default checkoutSummary;