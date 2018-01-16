import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  dataToJS,
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'
import AddProduct from '../../components/AddProduct'
import ProductGrid from '../../components/ProductGrid'

class Account extends Component {
  render () {
    const { auth, products } = this.props

    return (
      <div>
        {auth && auth.displayName ? (
          <div>
            <h2>My Account</h2>
            <div>Welcome {auth.displayName}({auth.email})</div>

            <AddProduct />

            <h3>My Rigs</h3>
            <div className="row text-center">
              <ProductGrid
                hasDelete={true}
                hasEdit={true}
                hasActiveToggle={true}
                products={products}
                showOnlyUser={true}
                showInactive={true}
                uid={auth.uid}
              />
            </div>

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
