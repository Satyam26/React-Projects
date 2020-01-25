import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHamburger } from '@fortawesome/free-solid-svg-icons';

import Styles from './Toolbar.module.css';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const Toolbar = (props) => {
  return (
    <div className={Styles.Toolbar}>
      <div onClick={props.toggleClicked} className={Styles.MobileOnly}><FontAwesomeIcon icon={faHamburger} size="lg" /></div>
      <div className={Styles.Logo}>
        <Logo />
      </div>
      <nav className={Styles.DesktopOnly}>
        <NavigationItems />
      </nav>
    </div>
  )
}

export default Toolbar;