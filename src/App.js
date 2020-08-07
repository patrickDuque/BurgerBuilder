import React from 'react';
import './scss/App.scss';
import Layout from './components/Layout';
import BurgerBuilder from './views/BurgerBuilder';
import Checkout from './views/Checkout';
import Orders from './views/Orders';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state.auth.user
  };
};

function App(props) {
  return (
    <BrowserRouter>
      <Layout>
        {!props.user ? <Redirect to='/signin' /> : null}
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

export default connect(mapStateToProps)(App);
