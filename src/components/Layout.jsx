import React from 'react';
import Aux from '../hoc/Auxilliary';
import Toolbar from './Toolbar';

export default props => (
  <Aux>
    <div id='Layout'>
      <Toolbar />
      <main className='Content'>{props.children}</main>
    </div>
  </Aux>
);
