// Libraries
import React, { Component } from 'react';
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
  withErrorHandler(
    class extends Component {
      state = {
        signIn : {
          email    : '',
          password : ''
        },
        error  : { message: 'Required', value: true }
      };

      onChangeOrderHandler = e => {
        this.setState({ signIn: { ...this.state.signIn, [e.target.id]: e.target.value } });
      };

      onSubmitLogIn = e => {
        e.preventDefault();
        this.props.onLogIn(this.state.signIn);
      };

      render() {
        let ingredientsArr = [];
        if (this.props.ingredients) {
          ingredientsArr = Object.keys(this.props.ingredients).map(igKey => [
            ...Array(this.props.ingredients[igKey])
          ]);
        }

        let form = <Spinner />;
        if (!this.props.loading) {
          form = (
            <form onSubmit={this.onSubmitLogIn}>
              <CustomInput
                onChange={this.onChangeOrderHandler}
                value={this.state.signIn.email}
                type='email'
                name='email'
                label='Email'
                id='email'
                rules={this.state.error}
              />
              <CustomInput
                onChange={this.onChangeOrderHandler}
                value={this.state.signIn.password}
                type='password'
                name='password'
                label='Password'
                id='password'
                rules={this.state.error}
              />
              <CustomButton type='Success'>SIGN IN</CustomButton>
            </form>
          );
        }

        return (
          <div id='SignIn'>
            {this.props.user ? <Redirect to={ingredientsArr.flat().length === 0 ? '/' : '/checkout'} /> : null}
            {form}
            {this.props.error ? this.props.error : null}
            <p>
              Doesn't have an account yet? <Link to='/signup'>Register</Link> here!
            </p>
          </div>
        );
      }
    },
    axios
  )
);
