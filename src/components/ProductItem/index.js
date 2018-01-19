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
    this.handleDelete = this.handleDelete.bind(this)

    this.state = { showEditModal: false }
  }

  // componentDidMount() {
  //   const { auth, firebase, products } = this.props
  //   const storageRef = firebase.storage().ref()
  //   const ref = storageRef.child('uploadedImages/available.gif')
  //
  //   ref.getDownloadURL().then(function(url) {
  //     // document.querySelector('img').src = url;
  //     console.log(url)
  //   })
  // }

  handleClose() {
    this.setState({ showEditModal: false })
  }

  handleShow() {
    this.setState({ showEditModal: true })
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

    if (product.purchased) {
      return false
    }

    return (
      <div className={`product-item ${className ? className : ''}`}>
        <Link to={`/rig/${id}`}>
          <img src="http://placehold.it/300x300" alt="" />
        </Link>
        <div className="caption">
          <h3><Link to={`/rig/${id}`}>{product.title}</Link></h3>
          <p>{product.description}</p>
          <p>{product.price}</p>

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
