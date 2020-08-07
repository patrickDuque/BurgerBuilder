// Dependencies
import React, { Component } from 'react';
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

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    state = {
      orderForm : {
        name        : '',
        street      : '',
        town        : '',
        city        : '',
        phoneNumber : ''
      }
    };

    submitOrderHandler = e => {
      e.preventDefault();
      const time = new Date();
      const data = {
        ingredients : this.props.ingredients,
        price       : this.props.price,
        customer    : {
          name        : this.state.orderForm.name,
          address     : {
            street : this.state.orderForm.street,
            town   : this.state.orderForm.town,
            city   : this.state.orderForm.city
          },
          phoneNumber : this.state.orderForm.phoneNumber
        },
        timeOrdered : `${time.getHours()}:${time.getMinutes()}`,
        userId      : localStorage.getItem('userId')
      };
      if (this.props.user) {
        this.props.onSendOrder(data, localStorage.getItem('token'));
      } else {
        this.props.history.push('/signin');
      }
    };

    onChangeOrderHandler = e => {
      this.setState({ orderForm: { ...this.state.orderForm, [e.target.id]: e.target.value } });
    };

    render() {
      let redirect = this.props.ordered ? <Redirect to='/' /> : null;
      let data = <Spinner />;
      if (!this.props.loading) {
        data = (
          <form onSubmit={this.submitOrderHandler}>
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.name}
              type='text'
              name='name'
              label='Name'
              id='name'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.street}
              type='text'
              name='street'
              label='Street'
              id='street'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.town}
              type='text'
              name='town'
              label='Town'
              id='town'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.city}
              type='text'
              name='city'
              label='City'
              id='city'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.phoneNumber}
              type='number'
              name='phoneNumber'
              label='Contact Number'
              id='phoneNumber'
            />
            <CustomButton type='Success'>{this.props.user ? 'ORDER' : 'SIGN IN'}</CustomButton>
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
    }
  }
);
