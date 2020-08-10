// Libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../axios';

// Store
import * as authActions from '../store/actions/auth';

// Components
import CustomInput from '../components/UI/CustomInput';
import CustomButton from '../components/UI/CustomButton';
import withErrorHandler from '../hoc/withErrorHandler';
import Spinner from '../components/UI/Spinner';

const mapStateToProps = state => {
  return {
    loading : state.auth.loading,
    error   : state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp : user => dispatch(authActions.signUp(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(props => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error ] = useState({ message: 'Required' });

    const onSubmitLogIn = e => {
      e.preventDefault();
      props.onSignUp({ email, password });
    };

    let form = <Spinner />;
    if (!props.loading) {
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
        {props.error ? props.error : null}
        <p>
          Already have an account? <Link to='/signin'>Log In</Link> here!
        </p>
      </div>
    );
  }, axios)
);
