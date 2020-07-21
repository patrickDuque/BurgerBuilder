import React from 'react';

export default props => (
  <button className={`Button ${props.type}`} onClick={props.click}>
    {props.children}
  </button>
);
