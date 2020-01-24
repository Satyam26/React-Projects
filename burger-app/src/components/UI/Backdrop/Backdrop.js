import React from 'react';

import Styles from './Backdrop.module.css'

const backdrop = props => {
  return (props.show ? <div className={Styles.Backdrop} onClick={props.removeBackdrop}></div> : null)
}

export default backdrop;