import React from 'react';

import Styles from './NavigationItems.module.css';
import NavigationItems from './NavigationItem/NavigationItem';

const navigationItems = props => {
  return (
    <ul className={Styles.NavigationItems}>
      <NavigationItems active link="/" >BurgerBuilder</NavigationItems>
      <NavigationItems link="/" >Checkout</NavigationItems>
    </ul>
  );
}

export default navigationItems;