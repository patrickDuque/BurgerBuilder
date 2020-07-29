import React, { Component } from 'react';
import CheckoutSummary from '../components/Order/CheckoutSummary';
import ContactData from './ContactData';
import { Route } from 'react-router-dom';

export default class extends Component {
  state = {
    ingredients : {},
    price       : 0
  };

  componentDidMount() {
    // this.props.location.search
    //   .substr(1)
    //   .split('&')
    //   .map(item => {
    //     return item.split('=');
    //   })
    //   .forEach(i => {
    //     ingredients[i[0]] = +i[1];
    //   });
    // this.setState({ ingredients: ingredients });
    const ingredients = {};
    const query = new URLSearchParams(this.props.location.search);
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = +param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, price: price });
  }

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <React.Fragment>
        <CheckoutSummary
          continue={this.continueCheckoutHandler}
          cancel={this.cancelCheckoutHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} />}
        />
      </React.Fragment>
    );
  }
}
