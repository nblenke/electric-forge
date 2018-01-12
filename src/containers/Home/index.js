import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  // isLoaded,
  // isEmpty,
  dataToJS,
  pathToJS,
} from 'react-redux-firebase'
import ProductList from '../../components/ProductList'

class Home extends Component {
  render () {
    const { products } = this.props
    return (
      <div className="container">
        <section className="jumbotron hero-spacer">
          <h1>Start Mining Today!</h1>
          <h2>Electric Forge provides 100% of the resources and tools
           you need to mine CryptoCoins, including BitCoin and Ethereum</h2>
        </section>

        <div className="row">
          <div className="col-lg-12">
            <h3>Operational Rigs</h3>
          </div>
        </div>
        <div className="row text-center">
          <ProductList products={products} />
        </div>

        <div className="row">
          <div className="col-lg-12">
            <h3>Available Rigs</h3>
          </div>
        </div>
        <div className="row text-center">
          <ProductList products={products} />
        </div>
      </div>
    )
  }
}

export default compose(
  firebaseConnect([
    '/products',
    // { type: 'once', path: '/products' } // for loading once instead of binding
    // '/products#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
    // '/products#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
    // { path: 'products', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
    // '/products#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
  ]),
  connect(
    ({ firebase }) => ({
      auth: pathToJS(firebase, 'auth'),
      products: dataToJS(firebase, 'products'),
    })
  )
)(Home)
