import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import About from '../About/'
import Admin from '../Admin/'
import ContactUs from '../ContactUs/'
import Footer from '../../components/Footer/'
import Home from '../Home/'
import HowToPurchase from '../HowToPurchase/'
import Header from '../../components/Header/'
import Login from '../Login/'
import Msa from '../Msa'
import ProductDetail from '../ProductDetail/'
import ProductList from '../ProductList/'
import Terms from '../Terms/'
import configureStore from '../../store'
import ScrollToTop from '../../components/ScrollToTop'
import Analytics from '../../components/Analytics'
import './styles.css'

const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <Analytics />
        <ScrollToTop />
        <Header />

        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/how-to-purchase" component={HowToPurchase} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/rig/:id" component={ProductDetail} />
        <Route exact path="/rigs" component={ProductList} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/msa" component={Msa} />

        <Footer />
      </div>
    </Router>
  </Provider>
)
