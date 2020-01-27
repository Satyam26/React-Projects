import React from 'react';

import Styles from './Order.module.css';
const order = (props) => {

  const ingredients = props.ingredients;
  const price = props.price;

  const transformedIngredients = Object.keys(ingredients).map((igkey, index) => {
    if (+ingredients[igkey] > 0) {
      return <span style={{ textTransform: 'capitalize' }} key={igkey + index}>{igkey}: ({ingredients[igkey]}), </span>
    } else {
      return null;
    }
  }).filter(ingredient => {
    return !!ingredient;
  });

  console.log(transformedIngredients);

  return (


    <div className={Styles.Order}>
      <h3>Ingredients:</h3>
      {transformedIngredients}
      <p><strong>Totalprice : {Number.parseFloat(price).toFixed(2)}</strong></p>
    </div>
  );
}

export default order;