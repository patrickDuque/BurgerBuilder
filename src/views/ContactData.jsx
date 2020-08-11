// Dependencies
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Constants
import { ingredientsActions } from '../store/actions/ingredients';

// Components
import CustomButton from '../components/UI/CustomButton';
import Spinner from '../components/UI/Spinner';
import CustomInput from '../components/UI/CustomInput';

export default props => {
  const dispatch = useDispatch();
  // State
  const [ name, setName ] = useState('');
  const [ street, setStreet ] = useState('');
  const [ town, setTown ] = useState('');
  const [ city, setCity ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');

  // Selectors
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const price = useSelector(state => state.ingredients.price);
  const loading = useSelector(state => state.ingredients.loading);
  const ordered = useSelector(state => state.ingredients.ordered);
  const user = useSelector(state => state.auth.user);

  // Dispatch
  const onSendOrder = (data, token) => dispatch(ingredientsActions.postOrder(data, token));

  // Handlers
  const submitOrderHandler = e => {
    e.preventDefault();
    const time = new Date();
    const data = {
      ingredients : ingredients,
      price       : price,
      customer    : {
        name        : name,
        address     : {
          street : street,
          town   : town,
          city   : city
        },
        phoneNumber : phoneNumber
      },
      timeOrdered : `${time.getHours()}:${time.getMinutes()}`,
      userId      : localStorage.getItem('userId')
    };
    if (user) {
      onSendOrder(data, localStorage.getItem('token'));
    } else {
      props.history.push('/signin');
    }
  };

  // Variables
  let redirect = ordered ? <Redirect to='/' /> : null;
  let data = <Spinner />;
  if (!loading) {
    data = (
      <form onSubmit={submitOrderHandler}>
        <CustomInput
          onChange={e => setName(e.target.value)}
          value={name}
          type='text'
          name='name'
          label='Name'
          id='name'
        />
        <CustomInput
          onChange={e => setStreet(e.target.value)}
          value={street}
          type='text'
          name='street'
          label='Street'
          id='street'
        />
        <CustomInput
          onChange={e => setTown(e.target.value)}
          value={town}
          type='text'
          name='town'
          label='Town'
          id='town'
        />
        <CustomInput
          onChange={e => setCity(e.target.value)}
          value={city}
          type='text'
          name='city'
          label='City'
          id='city'
        />
        <CustomInput
          onChange={e => setPhoneNumber(e.target.value)}
          value={phoneNumber}
          type='number'
          name='phoneNumber'
          label='Contact Number'
          id='phoneNumber'
        />
        <CustomButton type='Success'>{user ? 'ORDER' : 'SIGN IN'}</CustomButton>
      </form>
    );
  }
  return (
    <div id='ContactData'>
      {redirect}
      <h4>Enter your contact details</h4>
      {data}
    </div>
  );
};
