import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { firebase } from 'react-redux-firebase'
import './styles.css'

class ProductItem extends Component {
  render(){
    const { firebase, hasDelete, hasForSale, id, product } = this.props
    const toggleDone = () => {
      firebase.set(`/products/${id}/forSale`, !product.done)
    }

    const deleteProduct = (event) => {
       firebase.remove(`/products/${id}`)
    }

    return (
      <div className="col-xs-12 col-sm-6 col-md-4 product-item">
        <div className="thumbnail">
          <img src="http://placehold.it/800x500" alt="" />
          <div className="caption">
            <h3>{product.text || product.name}</h3>
            {hasForSale ?
              <div className="row">
                <input
                  className="Todo-Input"
                  type="checkbox"
                  checked={product.done}
                  onChange={toggleDone}
                /> For Sale
              </div>
            : null }
            <div className="row">
              {hasDelete ?
                  <button className="btn btn-primary" onClick={deleteProduct}>
                    Delete
                  </button>
              : null}
              <a href="" className="btn btn-primary">Buy Now!</a>
              <a href="" className="btn btn-default">Details</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default firebase()(ProductItem)
