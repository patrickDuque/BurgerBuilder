import React from 'react';
import { NavLink } from 'react-router-dom';

export default props => {
  return (
    <ul id='NavItems'>
      <li className='NavItem'>
        <NavLink to='/' exact>
          Burger Builder
        </NavLink>
      </li>
      {/* <li className='NavItem'>
        <NavLink to='/checkout'>Checkout</NavLink>
      </li>
      <li className='NavItem'>
        <NavLink to='/orders'>Orders</NavLink>
      </li> */}
    </ul>
  );
};
