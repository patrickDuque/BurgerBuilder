import React from 'react';

export default props => (
  <div id='BuildControl'>
    <div className='Label'>{props.label}</div>
    <button disabled={props.disabledSub} onClick={props.subtract} className='Less'>
      Less
    </button>
    <button disabled={props.disabledAdd} onClick={props.add} className='More'>
      More
    </button>
  </div>
);
