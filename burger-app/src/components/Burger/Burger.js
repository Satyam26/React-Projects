import React from 'react';

import Styles from './Burger.module.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = props => {

  let transformedIngredients = Object.entries(props.ingredients).length ? Object.keys(props.ingredients).map(igkey => {
    return [...Array(props.ingredients[igkey])].map((dummyValue, i) => {
      return <BurgerIngredients key={igkey + i} type={igkey} />
    })
  }).reduce((arr, el) => {
    return arr.concat(el);
  }) : [];
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p> please start adding ingredients!</p>
  }
  return (
    <div className={Styles.Burger}>
      <BurgerIngredients type="bread-top" />
      {transformedIngredients}
      <BurgerIngredients type="bread-bottom" />
    </div>
  );
}
export default burger;