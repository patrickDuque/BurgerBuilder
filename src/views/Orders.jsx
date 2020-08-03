import React, { Component } from 'react';
import Order from '../components/Order/Order';
import Spinner from '../components/UI/Spinner';
import { connect } from 'react-redux';
import { ordersAction } from '../store/actions/orders';

const mapStateToProps = state => {
  const { orders, loading } = state.orders;
  return {
    orders,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetData : () => dispatch(ordersAction.getOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    componentDidMount() {
      this.props.onGetData();
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
