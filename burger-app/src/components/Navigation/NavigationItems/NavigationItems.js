import React from 'react';

import Styles from './NavigationItems.module.css';
import NavigationItems from './NavigationItem/NavigationItem';

const navigationItems = props => {
  return (
    <ul className={Styles.NavigationItems}>
      <NavigationItems exact link="/"  >BurgerBuilder</NavigationItems>
      <NavigationItems link="/orders" >Orders</NavigationItems>
    </ul>
  );
}

export default navigationItems;