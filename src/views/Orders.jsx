import React, { Component } from 'react';
import Order from '../components/Order/Order';
import Spinner from '../components/UI/Spinner';
import { connect } from 'react-redux';
import { ordersAction } from '../store/actions/orders';

const mapStateToProps = state => {
  const { orders, loading } = state.orders;
  return {
    orders,
    loading,
    token   : state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders : token => dispatch(ordersAction.getOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    componentDidMount() {
      this.props.onGetOrders(this.props.token);
    }
    render() {
      return (
        <div style={{ padding: '10px' }}>
          {this.props.orders ? this.props.orders.map(order => <Order key={order.id} order={order} />) : <Spinner />}
        </div>
      );
    }
  }
);
