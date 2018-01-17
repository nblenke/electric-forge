import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import About from '../About/'
import Account from '../Account/'
import Footer from '../../components/Footer/'
import Home from '../Home/'
import Header from '../../components/Header/'
import Login from '../Login/'
import Privacy from '../Privacy/'
import ProductDetail from '../ProductDetail/'
import ProductList from '../ProductList/'
import Terms from '../Terms/'
import configureStore from '../../store'
import './styles.css'

const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/rig/:id" component={ProductDetail} />
          <Route exact path="/rigs" component={ProductList} />
          <Route exact path="/terms" component={Terms} />
          <Route exact path="/privacy" component={Privacy} />
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>
)
