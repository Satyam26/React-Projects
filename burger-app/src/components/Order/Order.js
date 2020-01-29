import React from 'react';

import Styles from './Order.module.css';
const order = (props) => {

  const ingredients = props.ingredients;
  const price = props.price;

  const transformedIngredients = Object.keys(ingredients).map((igkey, index) => {
    if (+ingredients[igkey] > 0) {
      return <span style={{ textTransform: 'capitalize', padding: '10px', margin: '5px', border: '1px solid black' }} key={igkey + index}>{igkey}: ({ingredients[igkey]}) </span>
    } else {
      return null;
    }
  }).filter(ingredient => {
    return !!ingredient;
  });

  return (


    <div className={Styles.Order}>
      <h3>Ingredients:</h3>
      {transformedIngredients}
      <p><strong>Totalprice : {Number.parseFloat(price).toFixed(2)}</strong></p>
    </div>
  );
}

export default order;