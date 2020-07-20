import React from 'react';
import Aux from '../hoc/Auxilliary';

export default props => (
  <Aux>
    <div id='Layout'>
      Toolbar, Side Drawer, Backdrop
      <main className='Content'>{props.children}</main>
    </div>
  </Aux>
);
