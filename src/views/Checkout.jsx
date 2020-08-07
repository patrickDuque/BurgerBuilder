// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import CheckoutSummary from '../components/Order/CheckoutSummary';
import ContactData from './ContactData';
import { Route, Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  const { ingredients, price } = state.ingredients;
  return {
    ingredients,
    price,
    user        : state.auth.user
  };
};

export default connect(mapStateToProps)(
  class extends Component {
    cancelCheckoutHandler = () => {
      this.props.history.goBack();
    };

    continueCheckoutHandler = () => {
      this.props.user
        ? this.props.history.replace(this.props.match.path + '/contact-data')
        : this.props.history.push('/signup');
    };

    render() {
      return (
        <React.Fragment>
          {this.props.ingredients ? (
            <CheckoutSummary
              continue={this.continueCheckoutHandler}
              cancel={this.cancelCheckoutHandler}
              ingredients={this.props.ingredients}
            />
          ) : (
            <Redirect to='/' />
          )}
          <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
        </React.Fragment>
      );
    }
  }
);
