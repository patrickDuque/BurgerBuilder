import React, { Component } from 'react';
import Order from '../components/Order/Order';
import Spinner from '../components/UI/Spinner';
import axios from '../axios';
import withErrorHandler from '../hoc/withErrorHandler';

export default class extends Component {
  state = {
    orders : null
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('/orders.json')
      .then(res => {
        const orders = [];
        for (let order in res.data) {
          orders.push({ ...res.data[order], id: order });
        }
        this.setState({ orders: orders });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div style={{ padding: '10px' }}>
        {this.state.orders ? this.state.orders.map(order => <Order key={order.id} order={order} />) : <Spinner />}
      </div>
    );
  }
}
