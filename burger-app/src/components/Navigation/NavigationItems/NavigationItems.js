import React from 'react';

import Styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => {
  return (
    <ul className={Styles.NavigationItems}>
      <NavigationItem exact link="/"  >BurgerBuilder</NavigationItem>
      {props.isAuth ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
      {props.isAuth ? <NavigationItem link="/logout" >Log Out</NavigationItem>
        : <NavigationItem link="/auth" >Authenticate</NavigationItem>}
    </ul>
  );
}

export default navigationItems;