import React, { Component } from 'react';
import CustomButton from '../components/UI/CustomButton';
import Spinner from '../components/UI/Spinner';
import CustomInput from '../components/UI/CustomInput';
import axios from '../axios';
import { withRouter } from 'react-router-dom';

export default withRouter(
  class extends Component {
    state = {
      orderForm : {
        name        : '',
        street      : '',
        town        : '',
        city        : '',
        phoneNumber : ''
      },
      loading   : false
    };

    orderHandler = () => {
      this.setState({ loading: true });
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
        timeOrdered : `${time.getHours()}:${time.getMinutes()}`
      };
      axios
        .post('/orders.json', data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      this.props.history.push('/');
    };

    onChangeOrderHandler = e => {
      this.setState({ orderForm: { ...this.state.orderForm, [e.target.id]: e.target.value } }, () =>
        console.log(this.state.orderForm)
      );
    };

    render() {
      let data = <Spinner />;
      if (!this.state.loading) {
        data = (
          <form>
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.name}
              type='text'
              name='name'
              placeholder='Name'
              label='Name'
              id='name'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.street}
              type='text'
              name='street'
              placeholder='Street'
              label='Street'
              id='street'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.town}
              type='text'
              name='town'
              placeholder='Town'
              label='Town'
              id='town'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.city}
              type='text'
              name='city'
              placeholder='City'
              label='City'
              id='city'
            />
            <CustomInput
              onChange={this.onChangeOrderHandler}
              value={this.state.orderForm.phoneNumber}
              type='number'
              name='phoneNumber'
              placeholder='Contact Number'
              label='Contact Number'
              id='phoneNumber'
            />
            <CustomButton type='Success' click={this.orderHandler}>
              ORDER
            </CustomButton>
          </form>
        );
      }
      return (
        <div id='ContactData'>
          <h4>Enter your contact details</h4>
          {data}
        </div>
      );
    }
  }
);
