import React from 'react';
import './scss/App.scss';
import Layout from './components/Layout';
import BurgerBuilder from './views/BurgerBuilder';
import Checkout from './views/Checkout';
import Orders from './views/Orders';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout>
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

export default App;
