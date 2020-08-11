// Libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ordersAction } from '../store/actions/orders';
import axios from '../axios';

// Components
import Spinner from '../components/UI/Spinner';
import Order from '../components/Order/Order';
import withErrorHandler from '../hoc/withErrorHandler';

const mapStateToProps = state => {
  const { orders, loading } = state.orders;
  return {
    orders,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetOrders : token => dispatch(ordersAction.getOrders(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(props => {
    const { onGetOrders } = props;
    useEffect(
      () => {
        onGetOrders(localStorage.getItem('token'));
      },
      [ onGetOrders ]
    );

    return (
      <div style={{ padding: '10px' }}>
        {props.orders ? props.orders.map(order => <Order key={order.id} order={order} />) : <Spinner />}
      </div>
    );
  }, axios)
);
