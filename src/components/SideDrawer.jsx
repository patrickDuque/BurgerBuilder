import React from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import BackDrop from './UI/Backdrop';
import Aux from '../hoc/Auxilliary';

export default props => {
  let attachedClasses = 'Close';

  if (props.open) {
    attachedClasses = 'Open';
  }

  return (
    <Aux>
      <BackDrop show={props.open} remove={props.closeSideDrawer} />
      <div id='SideDrawer' className={attachedClasses}>
        <Logo height='11%' />
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};
