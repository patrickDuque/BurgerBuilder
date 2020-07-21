import React from 'react';
import Aux from '../../hoc/Auxilliary';
import CustomButton from '../UI/CustomButton';

export default props => {
  const ingSummary = Object.keys(props.ingredients).map(ingredient => (
    <li key={ingredient + props.ingredients[ingredient]}>
      <span style={{ textTransform: 'capitalize' }}>{ingredient}</span>: {props.ingredients[ingredient]}
    </li>
  ));

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingSummary}</ul>
      <p>
        <strong>Total of: &#8369;{props.price}</strong>
      </p>
      <p>Continue to checkout?</p>
      <CustomButton type='Success'>CONTINUE</CustomButton>
      <CustomButton click={props.cancel} type='Danger'>
        CANCEL
      </CustomButton>
    </Aux>
  );
};
