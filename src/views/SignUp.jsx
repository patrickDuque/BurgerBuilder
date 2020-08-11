// Libraries
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../axios';

// Store
import * as authActions from '../store/actions/auth';

// Components
import CustomInput from '../components/UI/CustomInput';
import CustomButton from '../components/UI/CustomButton';
import withErrorHandler from '../hoc/withErrorHandler';
import Spinner from '../components/UI/Spinner';

export default withErrorHandler(props => {
  const dispatch = useDispatch();

  // State
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error ] = useState({ message: 'Required' });
  const loading = useSelector(state => state.auth.loading);
  const userError = useSelector(state => state.auth.error);

  // Dispatch
  const onSignUp = user => dispatch(authActions.signUp(user));

  // Handlers
  const onSubmitLogIn = e => {
    e.preventDefault();
    onSignUp({ email, password });
  };

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
        <CustomButton type='Success'>SIGN UP</CustomButton>
      </form>
    );
  }
  return (
    <div id='SignIn'>
      {form}
      {userError ? userError : null}
      <p>
        Already have an account? <Link to='/signin'>Log In</Link> here!
      </p>
    </div>
  );
}, axios);
