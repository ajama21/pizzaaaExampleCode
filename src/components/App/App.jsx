import React from 'react';
import axios from 'axios';

import { HashRouter as Router, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import './App.css';

import OrderPage from '../OrderPage/OrderPage';
import AddressPage from '../AddressPage/AddressPage';
import CheckoutPage from '../CheckoutPage/CheckoutPage';
import AdminPage from '../AdminPage/AdminPage';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    fetchMenu()
  }, [])

  const fetchMenu = () => {
    axios.get('/api/pizza')
      .then((result) => {
        console.log('GET /api/pizza success', result.data);

        dispatch({
          type: 'MENU_REFRESH',
          payload: result.data
        });
      })
      .catch((err) => {
        console.log('GET /api/pizza fail', err);
      })
  }

  return (
    <Router>

      <div className='App'>

        <Route path="/" exact>
          <OrderPage />
        </Route>

        <Route path="/order" exact>
          <OrderPage />
        </Route>

        <Route path="/address" exact>
          <AddressPage />
        </Route>

        <Route path="/checkout" exact>
          <CheckoutPage />
        </Route>

        <Route path="/admin" exact>
          <AdminPage />
        </Route>


      </div>

    </Router>
  );
}

export default App;
