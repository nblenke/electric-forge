import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  // isLoaded,
  // isEmpty,
  dataToJS,
  // pathToJS,
} from 'react-redux-firebase'
import ProductList from '../../components/ProductList'

class Home extends Component {
  render () {
    const { products } = this.props
    return (
      <div className="container">
        <header className="jumbotron hero-spacer">
          <h1>Lorem ipsum dolor</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid similique quaerat nam nobis illo aspernatur vitae fugiat numquam repellat.</p>
          <p><a className="btn btn-primary btn-large">Call to action!</a>
          </p>
        </header>
        <hr />
        <div className="row">
          <div className="col-lg-12">
            <h3>Top Products</h3>
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
      // auth: pathToJS(firebase, 'auth'),
      products: dataToJS(firebase, 'products'),
    })
  )
)(Home)
