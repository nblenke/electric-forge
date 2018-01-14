import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  dataToJS,
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'
import AddProduct from '../../components/AddProduct'
import ProductList from '../../components/ProductList'

class Account extends Component {
  handleAdd = () => {
    const { firebase } = this.props
    firebase.push('/products', {
      text: this.input.value,
      done: false
    })
  }

  render () {
    const { auth, products } = this.props

    return (
      <div>
        {auth && auth.displayName ? (
          <div>
            <h2>My Account</h2>
            <div>Welcome {auth.displayName}({auth.email})</div>

            <h3>Add Rig</h3>
            <AddProduct />

            <h3>My Rigs</h3>
            <div className="row text-center">
              <ProductList hasDelete={true} products={products} restrict={true} />
            </div>

            <h3>Stats</h3>

          </div>
        ) : null}
      </div>
    )
  }
}

export default compose(
  firebaseConnect([
    '/products',
  ]),
  connect(
    ({ firebase }) => ({
      authError: pathToJS(firebase, 'authError'),
      auth: pathToJS(firebase, 'auth'),
      products: dataToJS(firebase, 'products'),
      profile: pathToJS(firebase, 'profile')
    })
  )
)(Account)
