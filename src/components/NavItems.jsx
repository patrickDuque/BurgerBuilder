import React from 'react';

export default props => {
  return (
    <ul id='NavItems'>
      <li className='NavItem'>
        <a className='active' href='/'>
          Burger Builder
        </a>
      </li>
      <li className='NavItem'>
        <a href='/'>Checkout</a>
      </li>
    </ul>
  );
};
