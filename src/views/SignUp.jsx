import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';
import CustomInput from '../components/UI/CustomInput';
import CustomButton from '../components/UI/CustomButton';
import withErrorHandler from '../hoc/withErrorHandler';
import axios from '../axios';
import { Link } from 'react-router-dom';
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
  withErrorHandler(
    class extends Component {
      state = {
        signUp : {
          email    : '',
          password : ''
        },
        error  : { message: 'Required', value: true }
      };

      onChangeOrderHandler = e => {
        this.setState({ signUp: { ...this.state.signUp, [e.target.id]: e.target.value } });
      };

      onSubmitLogIn = e => {
        e.preventDefault();
        this.props.onSignUp(this.state.signUp);
      };

      render() {
        let form = <Spinner />;
        if (!this.props.loading) {
          form = (
            <form onSubmit={this.onSubmitLogIn}>
              <CustomInput
                onChange={this.onChangeOrderHandler}
                value={this.state.signUp.email}
                type='email'
                name='email'
                label='Email'
                id='email'
                rules={this.state.error}
              />
              <CustomInput
                onChange={this.onChangeOrderHandler}
                value={this.state.signUp.password}
                type='password'
                name='password'
                label='Password'
                id='password'
                rules={this.state.error}
              />
              <CustomButton type='Success'>SIGN UP</CustomButton>
            </form>
          );
        }
        return (
          <div id='SignIn'>
            {form}
            {this.props.error ? this.props.error : null}
            <p>
              Already have an account? <Link to='/signin'>Log In</Link> here!
            </p>
          </div>
        );
      }
    },
    axios
  )
);
