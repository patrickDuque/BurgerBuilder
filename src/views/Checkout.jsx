// Dependencies
import React from 'react';
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

export default connect(mapStateToProps)(props => {
  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };

  const continueCheckoutHandler = () => {
    props.user ? props.history.replace(props.match.path + '/contact-data') : props.history.push('/signup');
  };
  return (
    <React.Fragment>
      {props.ingredients ? (
        <CheckoutSummary
          continue={continueCheckoutHandler}
          cancel={cancelCheckoutHandler}
          ingredients={props.ingredients}
        />
      ) : (
        <Redirect to='/' />
      )}
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </React.Fragment>
  );
});
