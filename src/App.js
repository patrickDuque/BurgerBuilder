// Libraries
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as actions from './store/actions/auth';

// SASS
import './scss/App.scss';

// Components
import Layout from './components/Layout';
import BurgerBuilder from './views/BurgerBuilder';
import Checkout from './views/Checkout';
import Orders from './views/Orders';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

const mapStateToProps = state => {
  return {
    ingredients : state.ingredients.ingredients === null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin : () => dispatch(actions.authCheck())
  };
};

function App(props) {
  useEffect(() => props.onAutoLogin(), []);
  return (
    <BrowserRouter>
      <Layout>
        {props.ingredients ? <Redirect to='/' /> : null}
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/orders' component={Orders} />
          <Route path='/' component={BurgerBuilder} exact />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
