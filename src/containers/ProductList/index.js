import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import ProductGrid from '../../components/ProductGrid'

class ProductList extends Component {
  render () {
    const { products } = this.props
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3>Rigs</h3>
          </div>
        </div>
        <div className="row text-center">
          <ProductGrid products={products} />
        </div>
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
      products: dataToJS(firebase, 'products'),
    })
  )
)(ProductList)
