import React from 'react';

import Styles from './Toolbar.module.css';
import Logo from '../../LOGO/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const Toolbar = (props) => {
  return (
    <div className={Styles.Toolbar}>
      <div onClick={props.toggleClicked} className={Styles.MobileOnly}>MENU</div>
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