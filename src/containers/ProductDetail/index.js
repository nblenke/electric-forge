import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Button, Modal } from 'react-bootstrap'
import Purchase from '../../components/Purchase'
import './styles.css'

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = { showPurchaseModal: false }
  }

  handleClose() {
    this.setState({ showPurchaseModal: false })
  }

  handleShow() {
    this.setState({ showPurchaseModal: true })
  }

  render () {
    const { match, products } = this.props

    if (!products) {
      return false
    }

    const product = products[match.params.id]
    const { description, imgPath, price, title } = product

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-5">
            {imgPath ? (
              <img src={imgPath} alt={title} className="product-item__image" />
            ) : <div className="product-item__no-image"></div> }
          </div>

          <div className="col-xs-12 col-sm-7">
            <h3>{title}</h3>
            <p>{description}</p>
            <p>Price: {price}</p>
            <p>Currently Mining:</p>
            <p>Ethermine Id:</p>
            <p>Began Mining:</p>
            <p>Kwh:</p>
            <p>Current Monthly Output:</p>
            <p>24 hour Hashrate:</p>
            <p>Number Of Active Workers:</p>
            <button className="btn btn-primary btn-lg" onClick={this.handleShow}>Purchase Rig</button>
          </div>
        </div>

        <Modal show={this.state.showPurchaseModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Purchase</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Purchase product={product} id={match.params.id} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
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
      products
    })
  )
)(ProductDetail)
