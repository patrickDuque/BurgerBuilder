import React from 'react';

export default props => {
  let inputElement = <input {...props} />;

  if (props.inputType === 'textarea') {
    inputElement = <textarea {...props} />;
  }

  return (
    <div id='CustomInput'>
      <label htmlFor={props.id}>{props.label}</label>
      {inputElement}
    </div>
  );
};
