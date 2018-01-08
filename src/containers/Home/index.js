import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS,
} from 'react-redux-firebase'
import ProductItem from '../../components/ProductItem'

class Home extends Component {
  handleAdd = () => {
    const { firebase } = this.props
    firebase.push('/products', {
      text: this.input.value,
      done: false
    })
  }

  render () {
    const { auth, products } = this.props
    const productsList = (!isLoaded(products))
      ? 'Loading'
      : (isEmpty(products))
        ? 'No products'
        : Object.keys(products).map((key) => (
          <ProductItem key={key} id={key} product={products[key]} />
        ))

    return (
      <div>
        {productsList}

        {auth && auth.displayName ? (
          <div>
            <input type='text' ref={ref => { this.input = ref }} />
            <button onClick={this.handleAdd}>
              Add
            </button>
          </div>
        ) : null}

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
