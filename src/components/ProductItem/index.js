import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { firebase } from 'react-redux-firebase'
import './styles.css'

class ProductItem extends Component {
  render() {
    const {
      className,
      firebase,
      hasDelete,
      id,
      product,
    } = this.props

    const deleteProduct = (event) => {
       firebase.remove(`/products/${id}`)
    }

    return (
      <div className={`product-item ${className ? className : ''}`}>
        <img src="http://placehold.it/300x300" alt="" />
        <div className="caption">
          <h3>{product.title}</h3>
          <p>{product.description}</p>

          <div className="row">
            {hasDelete ?
                <button className="btn btn-primary" onClick={deleteProduct}>
                  Delete
                </button>
            : null}

            <a href="" className="btn btn-default">Details</a>
          </div>
        </div>
      </div>
    )
  }
}
export default firebase()(ProductItem)
