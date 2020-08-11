import React from 'react';
import Backdrop from './Backdrop';
import Aux from '../../hoc/Auxilliary';

export default React.memo(props => {
  return (
    <Aux>
      <Backdrop show={props.show} remove={props.removeModal} />
      <div
        id='Modal'
        style={{
          transform : props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity   : props.show ? '1' : '0'
        }}>
        {props.children}
      </div>
    </Aux>
  );
}, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);
