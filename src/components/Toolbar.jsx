import React from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import DrawerToggle from './DrawerToggle';

export default props => (
  <header id='Toolbar'>
    <DrawerToggle click={props.showSideDrawer} />
    <Logo height='90%' />
    <nav className='Desktop'>
      <NavItems />
    </nav>
  </header>
);
