import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class EditProduct extends Component {
  handleAdd = () => {
    const { firebase, id } = this.props

    firebase.update(`/products/${id}`, {
      title: this.title.value,
      description: this.description.value
    })
  }

  render () {
    const { product, id } = this.props

    return (
      <div>
        <div className="form-group">
          <label>ID</label>
          <input
            type='text'
            disabled="disabled"
            className="form-control"
            defaultValue={id} />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type='text'
            className="form-control"
            defaultValue={product.title}
            ref={ref => { this.title = ref }} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type='text'
            className="form-control"
            defaultValue={product.description}
            ref={ref => { this.description = ref }} />
        </div>
        <div className="form-group">
          <label>Ethermine ID</label>
          <input
            type='text'
            className="form-control"
            defaultValue={product.ethermineId}
            ref={ref => { this.ethermineId = ref }} />
        </div>
        <div className="form-group">
          <label>price</label>
          <input
            type='text'
            className="form-control"
            defaultValue={product.price}
            ref={ref => { this.price = ref }} />
        </div>


        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleAdd}>Save</button>
        </div>
      </div>
    )
  }
}

export default compose(
  firebaseConnect([
    'products',
  ]),
  connect(
    ({ firebase: { data: { products }} }) => ({
      products,
    })
  )
)(EditProduct)
