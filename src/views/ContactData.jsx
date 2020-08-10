// Dependencies
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Constants
import { ingredientsActions } from '../store/actions/ingredients';

// Components
import CustomButton from '../components/UI/CustomButton';
import Spinner from '../components/UI/Spinner';
import CustomInput from '../components/UI/CustomInput';

const mapStateToProps = state => {
  const { ingredients, price, loading, ordered } = state.ingredients;
  return {
    ingredients,
    price,
    loading,
    ordered,
    user        : state.auth.user,
    token       : state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onResetIngredients : () => dispatch(ingredientsActions.getIngredients()),
    onSendOrder        : (data, token) => dispatch(ingredientsActions.postOrder(data, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(props => {
  // State
  const [ name, setName ] = useState('');
  const [ street, setStreet ] = useState('');
  const [ town, setTown ] = useState('');
  const [ city, setCity ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');

  // Handlers
  const submitOrderHandler = e => {
    e.preventDefault();
    const time = new Date();
    const data = {
      ingredients : props.ingredients,
      price       : props.price,
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
    if (props.user) {
      props.onSendOrder(data, localStorage.getItem('token'));
    } else {
      props.history.push('/signin');
    }
  };

  // Variables
  let redirect = props.ordered ? <Redirect to='/' /> : null;
  let data = <Spinner />;
  if (!props.loading) {
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
        <CustomButton type='Success'>{props.user ? 'ORDER' : 'SIGN IN'}</CustomButton>
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
});
