import React from 'react';

export default props => (props.show ? <div onClick={props.remove} id='Backdrop' /> : null);
