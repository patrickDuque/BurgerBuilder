import React from 'react';
import './scss/App.scss';
import Layout from './components/Layout';
import BurgerBuilder from './views/BurgerBuilder';

function App() {
  return (
    <Layout>
      <BurgerBuilder />
    </Layout>
  );
}

export default App;
