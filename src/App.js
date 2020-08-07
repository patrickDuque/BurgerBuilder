// Libraries
import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as actions from './store/actions/auth';

// SASS
import './scss/App.scss';

// Components
import Layout from './components/Layout';
import BurgerBuilder from './views/BurgerBuilder';
import Checkout from './views/Checkout';
import SignIn from './views/SignIn';
// Lazy Loading
const Orders = React.lazy(() => import('./views/Orders'));
const SignUp = React.lazy(() => import('./views/SignUp'));

const mapStateToProps = state => {
  return {
    ingredients : state.ingredients.ingredients === null,
    user        : state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAutoLogin : () => dispatch(actions.authCheck())
  };
};

function App(props) {
  useEffect(() => props.onAutoLogin(), []);

  let routes = (
    <Switch>
      <Route path='/signin' component={SignIn} />
      <Route
        path='/signup'
        render={() => (
          <Suspense fallback={<div>...loading</div>}>
            <SignUp />
          </Suspense>
        )}
      />
      <Route path='/checkout' component={Checkout} />
      <Route path='/' component={BurgerBuilder} exact />
      <Redirect to='/' />
    </Switch>
  );

  if (props.user) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route
          path='/orders'
          render={() => (
            <Suspense fallback={<div>...loading</div>}>
              <Orders />
            </Suspense>
          )}
        />
        <Route path='/signin' component={SignIn} />
        <Route path='/' component={BurgerBuilder} exact />
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        {props.ingredients ? <Redirect to='/' /> : null}
        {routes}
      </Layout>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
