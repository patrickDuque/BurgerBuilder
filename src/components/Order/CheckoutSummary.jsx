import React from 'react';
import Burger from '../Burger/Burger';
import CustomButton from '../UI/CustomButton';

export default props => (
  <div id='CheckoutSummary'>
    <h1>Enjoy your burger</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <CustomButton type='Success' click={props.continue}>
      CONTINUE
    </CustomButton>
    <CustomButton type='Danger' click={props.cancel}>
      CANCEL
    </CustomButton>
  </div>
);
