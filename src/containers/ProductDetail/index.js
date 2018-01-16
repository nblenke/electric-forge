import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'

class Rigs extends Component {
  render () {
    const { match, products } = this.props

    if (!products) {
      return false
    }

    const product = products[match.params.id]

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
          </div>
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
)(Rigs)
