// Libraries
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ordersAction } from '../store/actions/orders';
import axios from '../axios';

// Components
import Spinner from '../components/UI/Spinner';
import Order from '../components/Order/Order';
import withErrorHandler from '../hoc/withErrorHandler';

export default withErrorHandler(() => {
  const dispatch = useDispatch();
  // Selectors
  const orders = useSelector(state => state.orders.orders);

  // Dispatch
  const onGetOrders = useCallback(token => dispatch(ordersAction.getOrders(token)), [ dispatch ]);

  // Effects
  useEffect(
    () => {
      onGetOrders(localStorage.getItem('token'));
    },
    [ onGetOrders ]
  );

  return (
    <div style={{ padding: '10px' }}>
      {orders ? orders.map(order => <Order key={order.id} order={order} />) : <Spinner />}
    </div>
  );
}, axios);
