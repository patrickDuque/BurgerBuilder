// Libraries
import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../axios';
import { Link, Redirect } from 'react-router-dom';

// Store
import * as authActions from '../store/actions/auth';

// Components
import CustomInput from '../components/UI/CustomInput';
import CustomButton from '../components/UI/CustomButton';
import Spinner from '../components/UI/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';

const mapStateToProps = state => {
  return {
    loading     : state.auth.loading,
    error       : state.auth.error,
    user        : state.auth.user,
    ingredients : state.ingredients.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogIn : user => dispatch(authActions.signIn(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(props => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error ] = useState({ message: 'Required' });

    const onSubmitLogIn = e => {
      e.preventDefault();
      props.onLogIn({ email, password });
    };
    let ingredientsArr = [];
    if (props.ingredients) {
      ingredientsArr = Object.keys(props.ingredients).map(igKey => [ ...Array(props.ingredients[igKey]) ]);
    }

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
          <CustomButton type='Success'>SIGN IN</CustomButton>
        </form>
      );
    }

    return (
      <div id='SignIn'>
        {props.user ? <Redirect to={ingredientsArr.flat().length === 0 ? '/' : '/checkout'} /> : null}
        {form}
        {props.error ? props.error : null}
        <p>
          Doesn't have an account yet? <Link to='/signup'>Register</Link> here!
        </p>
      </div>
    );
  }, axios)
);
