import React, { Component } from 'react'
import EditProduct from '../EditProduct'
import { firebase } from 'react-redux-firebase'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './styles.css'

class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      showEditModal: false,
    }
  }

  handleClose() {
    this.setState({ showEditModal: false })
  }

  handleShow() {
    this.setState({ showEditModal: true })
  }

  render() {
    const {
      className,
      hasDelete,
      hasDescription,
      hasEdit,
      id,
      product,
      onDelete,
    } = this.props

    const { description, imgPath, price, purchased, title } = product

    if (purchased) {
      return false
    }

    return (
      <div className={`product-item ${className ? className : ''}`}>
        <Link to={`/rig/${id}`}>
          {imgPath ? (
            <div className="product-item__image-wrap">
              <img src={imgPath} alt={title} />
            </div>
          ) : <div className="product-item__no-image"></div> }
        </Link>
        <div className="caption">
          <h3><Link to={`/rig/${id}`}>{title}</Link></h3>
          {hasDescription && <p>{description}</p>}
          <p>{price}</p>

          <div className="row">
            {hasDelete ?
              <button className="btn btn-default" onClick={(ev) => onDelete(id, imgPath)}>
                Delete
              </button>
            : null}

            {hasEdit ?
              <button className="btn btn-default" onClick={this.handleShow}>
                Edit
              </button>
            : null}
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
