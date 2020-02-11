import React from 'react';

import Logo from '../../LOGO/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Styles from './Sidedrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const Sidedrawer = props => {

  const Stylename = props.show ? Styles.Open : Styles.Close;
  return (
    <Aux>
      <Backdrop show={props.show} removeBackdrop={props.clicked} />
      <div className={[Styles.Sidedrawer, Stylename].join(' ')} onClick={props.clicked}>
        <div className={Styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
}

export default Sidedrawer;