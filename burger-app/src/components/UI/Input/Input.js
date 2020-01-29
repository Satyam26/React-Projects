import React from 'react';

import Styles from './Input.module.css';

const input = props => {

  let inputElement = null;

  const styleClasses = [Styles.InputElement];
  if (!props.valid && props.shouldValidate && props.touched) {
    styleClasses.push(Styles.Highlight);
  }

  switch (props.element_type) {
    case 'input':
      inputElement = <input className={styleClasses.join(' ')} {...props.element_config}
        value={props.value} onChange={props.changed} />
      break;
    case 'textarea':
      inputElement = <textarea className={styleClasses.join(' ')} {...props.element_config}
        value={props.value} onChange={props.changed} />
      break;
    case 'select':
      inputElement = <select className={styleClasses.join(' ')}
        value={props.value} onChange={props.changed}>
        {props.element_config.options.map(option => {
          return <option key={option.value} value={option.value}>{option.displayValue}</option>
        })}
      </select>
      break;
    default:
      inputElement = <input className={styleClasses.join(' ')} {...props.element_config}
        value={props.value} onChange={props.changed} />
  }

  return (
    <div className={Styles.Input}>
      <label className={Styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
}

export default input;