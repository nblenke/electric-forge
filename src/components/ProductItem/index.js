import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { firebase } from 'react-redux-firebase'
import './styles.css'

class ProductItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  render(){
    const {firebase, product, id} = this.props
    const toggleDone = () => {
      firebase.set(`/products/${id}/done`, !product.done)
    }

    const deleteProduct = (event) => {
       firebase.remove(`/products/${id}`)
    }

    return (
      <li class="product-item">
        <input
          className="Todo-Input"
          type="checkbox"
          checked={product.done}
          onChange={toggleDone}
        />
        {product.text || product.name}
        <button onClick={deleteProduct}>
          Delete
        </button>
      </li>
    )
  }
}
export default firebase()(ProductItem)
