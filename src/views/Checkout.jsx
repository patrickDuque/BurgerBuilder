// Dependencies
import React from 'react';
import { useSelector } from 'react-redux';

// Components
import CheckoutSummary from '../components/Order/CheckoutSummary';
import ContactData from './ContactData';
import { Route, Redirect } from 'react-router-dom';

export default props => {
  const ingredients = useSelector(state => state.ingredients.ingredients);
  const user = useSelector(state => state.auth.user);

  const cancelCheckoutHandler = () => {
    props.history.goBack();
  };

  const continueCheckoutHandler = () => {
    user ? props.history.replace(props.match.path + '/contact-data') : props.history.push('/signup');
  };
  return (
    <React.Fragment>
      {ingredients ? (
        <CheckoutSummary continue={continueCheckoutHandler} cancel={cancelCheckoutHandler} ingredients={ingredients} />
      ) : (
        <Redirect to='/' />
      )}
      <Route path={props.match.path + '/contact-data'} component={ContactData} />
    </React.Fragment>
  );
};
