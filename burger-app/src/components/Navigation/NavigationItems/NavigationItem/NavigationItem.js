import React from 'react';

import Styles from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
  return (
    <li className={Styles.NavigationItem}>
      <NavLink to={props.link} exact={props.exact} activeClassName={Styles.active}>{props.children}</NavLink>
    </li>
  )
}

export default navigationItem;