// Libraries
import React, { useEffect, Suspense, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import * as actions from './store/actions/auth';

// SASS
import './scss/App.scss';

// Components
import Layout from './components/Layout';
import BurgerBuilder from './views/BurgerBuilder';
import Checkout from './views/Checkout';
import SignIn from './views/SignIn';
import Spinner from './components/UI/Spinner';

// Lazy Loading
const Orders = React.lazy(() => import('./views/Orders'));
const SignUp = React.lazy(() => import('./views/SignUp'));

function App(props) {
  const dispatch = useDispatch();

  // Selector
  const ingredients = useSelector(state => state.ingredients.ingredients === null);
  const user = useSelector(state => state.auth.user);

  // Dispatch
  const onAutoLogin = useCallback(() => dispatch(actions.authCheck()), [ dispatch ]);

  // Effects
  useEffect(
    () => {
      onAutoLogin();
    },
    [ onAutoLogin ]
  );

  let routes = (
    <Switch>
      <Route path='/signin' component={SignIn} />
      <Route
        path='/signup'
        render={() => (
          <Suspense fallback={<Spinner />}>
            <SignUp />
          </Suspense>
        )}
      />
      <Route path='/checkout' component={Checkout} />
      <Route path='/' component={BurgerBuilder} exact />
      <Redirect to='/' />
    </Switch>
  );

  if (user) {
    routes = (
      <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route
          path='/orders'
          render={() => (
            <Suspense fallback={<Spinner />}>
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
        {ingredients ? <Redirect to='/' /> : null}
        {routes}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
