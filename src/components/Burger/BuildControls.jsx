import React from 'react';
import BuildControl from './BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
];

export default props => (
  <div id='BuildControls'>
    <h3>
      Current Price: <strong>&#8369;{props.price.toFixed(0)}</strong>
    </h3>
    {controls.map((control, i) => (
      <BuildControl
        disabledAdd={props.disabledAdd[control.type]}
        disabledSub={props.disabledSub[control.type]}
        add={() => props.ingredientAdd(control.type)}
        subtract={() => props.ingredientSubtract(control.type)}
        key={control.label + i}
        label={control.label}
      />
    ))}
    <button onClick={props.order} disabled={!props.purchaseable} className='OrderButton'>
      ORDER NOW
    </button>
  </div>
);
