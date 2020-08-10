// Libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ordersAction } from '../store/actions/orders';

// Components
import Spinner from '../components/UI/Spinner';
import Order from '../components/Order/Order';

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

export default connect(mapStateToProps, mapDispatchToProps)(props => {
  useEffect(() => {
    props.onGetOrders(localStorage.getItem('token'));
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      {props.orders ? props.orders.map(order => <Order key={order.id} order={order} />) : <Spinner />}
    </div>
  );
});
