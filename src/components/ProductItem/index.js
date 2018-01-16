import React, { Component } from 'react'
import EditProduct from '../EditProduct'
import { firebase } from 'react-redux-firebase'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.css'

class ProductItem extends Component {
  constructor(...args) {
    super(...args);

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.state = { showEditModal: false };
  }

  handleClose() {
    this.setState({ showEditModal: false });
  }

  handleShow() {
    this.setState({ showEditModal: true });
  }

  handleDelete() {
    const { firebase, id } = this.props
    firebase.remove(`/products/${id}`)
  }


  render() {
    const {
      className,
      hasDelete,
      hasEdit,
      id,
      product,
    } = this.props

    return (
      <div className={`product-item ${className ? className : ''}`}>
        <img src="http://placehold.it/300x300" alt="" />
        <div className="caption">
          <h3>{product.title}</h3>
          <p>{product.description}</p>

          <div className="row">
            {hasDelete ?
                <button className="btn btn-default" onClick={this.handleDelete}>
                  Delete
                </button>
            : null}

            {hasEdit ?
                <button className="btn btn-default" onClick={this.handleShow}>
                  Edit
                </button>
            : null}

            <Link to={`/rig/${id}`} className="btn btn-default">Details</Link>
          </div>
        </div>

        <Modal show={this.state.showEditModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Rig</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProduct product={product} id={id} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
export default firebase()(ProductItem)
