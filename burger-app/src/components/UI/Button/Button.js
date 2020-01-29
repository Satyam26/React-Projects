import React from 'react';

import Styles from './Button.module.css'

const Button = (props) => {
  return (
    <button className={[Styles.Button, Styles[props.type]].join(' ')} disabled={props.disabled}
      onClick={props.clicked}
    >{props.children}</button>
  )
}
export default Button;