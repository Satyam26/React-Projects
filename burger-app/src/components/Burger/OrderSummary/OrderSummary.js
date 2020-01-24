import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {

  const ingredientList = Object.keys(props.ingredients).map(igKey => {
    return <li key={igKey}><span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{igKey} :</span> {props.ingredients[igKey]}</li>
  })

  return (
    <Aux>
      <h3>This is your order Summary</h3>
      <p>Your delicious burger contains these ingredients</p>
      <ul>
        {ingredientList}
      </ul>
      <h1><strong>Total price: {props.price}</strong></h1>
      <h2>Would you like to continue</h2>
      <Button clicked={props.cancel} type={'Danger'}>CANCEL</Button>
      <Button clicked={props.continue} type={'Success'}>CONTINUE</Button>
    </Aux>
  );
}

export default orderSummary;