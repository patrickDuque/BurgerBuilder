// Libraries
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios';
import { Link, Redirect } from 'react-router-dom';

// Store
import * as authActions from '../store/actions/auth';

// Components
import CustomInput from '../components/UI/CustomInput';
import CustomButton from '../components/UI/CustomButton';
import Spinner from '../components/UI/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';

export default withErrorHandler(props => {
  const dispatch = useDispatch();

  // State
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error ] = useState({ message: 'Required' });
  const loading = useSelector(state => state.auth.loading);
  const user = useSelector(state => state.auth.user);
  const userError = useSelector(state => state.auth.error);
  const ingredients = useSelector(state => state.ingredients.ingredients);

  // Dispatch
  const onLogIn = user => dispatch(authActions.signIn(user));

  // Handlers
  const onSubmitLogIn = e => {
    e.preventDefault();
    onLogIn({ email, password });
  };
  let ingredientsArr = [];
  if (ingredients) {
    ingredientsArr = Object.keys(ingredients).map(igKey => [ ...Array(ingredients[igKey]) ]);
  }

  let form = <Spinner />;
  if (!loading) {
    form = (
      <form onSubmit={onSubmitLogIn}>
        <CustomInput
          onChange={e => setEmail(e.target.value)}
          value={email}
          type='email'
          name='email'
          label='Email'
          rules={error}
        />
        <CustomInput
          onChange={e => setPassword(e.target.value)}
          value={password}
          type='password'
          name='password'
          label='Password'
          rules={error}
        />
        <CustomButton type='Success'>SIGN IN</CustomButton>
      </form>
    );
  }

  return (
    <div id='SignIn'>
      {user ? <Redirect to={ingredientsArr.flat().length === 0 ? '/' : '/checkout'} /> : null}
      {form}
      {userError ? userError : null}
      <p>
        Doesn't have an account yet? <Link to='/signup'>Register</Link> here!
      </p>
    </div>
  );
}, axios);
