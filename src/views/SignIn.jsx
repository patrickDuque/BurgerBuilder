import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../store/actions/auth';
import CustomInput from '../components/UI/CustomInput';
import CustomButton from '../components/UI/CustomButton';
import withErrorHandler from '../hoc/withErrorHandler';
import axios from '../axios';

const mapDispatchToProps = dispatch => {
  return {
    onLogIn : user => dispatch(authActions.authActions(user))
  };
};

export default connect(null, mapDispatchToProps)(
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
        console.log(this.state.signIn);
        this.props.onLogIn(this.state.signIn);
      };

      render() {
        return (
          <div id='SignIn'>
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
          </div>
        );
      }
    },
    axios
  )
);
