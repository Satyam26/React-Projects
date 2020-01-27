import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import Styles from './BuildControls.module.css';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Cheese", type: "cheese" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" }
];

const buildControls = (props) => {
  return (

    <div className={Styles.BuildControls}>
      <h2>Total Price = <strong>{props.price}</strong></h2>
      {controls.map(ctrl => {
        return <BuildControl key={ctrl.label} label={ctrl.label} add={() => props.add(ctrl.type)} remove={() => props.remove(ctrl.type)} disabled={props.disabledInfo[ctrl.type]} />
      })}

      <button className={Styles.OrderButton}
        disabled={!props.purchasable}
        onClick={props.showModal}>ORDER NOW</button>

    </div>
  );
}

export default buildControls;