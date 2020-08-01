import React, { Component } from 'react';
import Order from '../components/Order/Order';
import Spinner from '../components/UI/Spinner';
import { ingredientsActions } from '../store/actions/actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    orders : state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetData : () => dispatch(ingredientsActions.getOrders())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  class extends Component {
    componentDidMount() {
      this.setState({ loading: true });
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
