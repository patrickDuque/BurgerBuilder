import React, { useState } from 'react';
import Aux from '../hoc/Auxilliary';
import Toolbar from './Toolbar';
import SideDrawer from './SideDrawer';

export default props => {
  const [
    sideDrawer,
    setSideDrawer
  ] = useState(false);

  const closeSideDrawerHandler = () => {
    setSideDrawer(false);
  };

  const showSideDrawerHandler = () => {
    setSideDrawer(true);
  };

  return (
    <Aux>
      <div id='Layout'>
        <Toolbar showSideDrawer={showSideDrawerHandler} open={sideDrawer} />
        <SideDrawer closeSideDrawer={closeSideDrawerHandler} open={sideDrawer} />
        <main className='Content'>{props.children}</main>
      </div>
    </Aux>
  );
};
