import React, { Component } from 'react';
import CustomButton from '../components/UI/CustomButton';
import Spinner from '../components/UI/Spinner';
import axios from '../axios';
import { withRouter } from 'react-router-dom';

export default withRouter(
  class extends Component {
    state = {
      name        : '',
      address     : {
        street : '',
        town   : '',
        city   : ''
      },
      phoneNumber : '',
      loading     : false
    };

    orderHandler = () => {
      this.setState({ loading: true });
      const time = new Date();
      const data = {
        ingredients : this.props.ingredients,
        price       : this.props.price,
        customer    : {
          name        : 'Patrick',
          address     : {
            street : 'Ruby',
            town   : 'Pandayan',
            city   : 'Meycauayan'
          },
          phoneNumber : '09176365214'
        },
        timeOrdered : `${time.getHours()}:${time.getMinutes()}`
      };
      axios
        .post('/orders.json', data)
        .then(res => {
          console.log(res);
          this.setState({
            loading : false
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({ loading: false });
        });
      this.props.history.push('/');
    };

    render() {
      let data = <Spinner />;
      if (!this.state.loading) {
        data = (
          <form>
            <input type='text' name='name' placeholder='Name' />
            <input type='text' name='street' placeholder='Street' />
            <input type='text' name='town' placeholder='Town' />
            <input type='text' name='city' placeholder='City' />
            <input type='number' name='phoneNumber' placeholder='Contact Number' />
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
