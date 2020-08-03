// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import CheckoutSummary from '../components/Order/CheckoutSummary';
import ContactData from './ContactData';
import { Route } from 'react-router-dom';

const mapStateToProps = state => {
  const { ingredients, price } = state.ingredients;
  return {
    ingredients,
    price
  };
};

export default connect(mapStateToProps)(
  class extends Component {
    cancelCheckoutHandler = () => {
      this.props.history.goBack();
    };

    continueCheckoutHandler = () => {
      this.props.history.replace(this.props.match.path + '/contact-data');
    };

    render() {
      return (
        <React.Fragment>
          <CheckoutSummary
            continue={this.continueCheckoutHandler}
            cancel={this.cancelCheckoutHandler}
            ingredients={this.props.ingredients}
          />
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </React.Fragment>
      );
    }
  }
);
