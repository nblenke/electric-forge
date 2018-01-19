import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  dataToJS,
} from 'react-redux-firebase'
import { Button, Modal } from 'react-bootstrap'
import Purchase from '../../components/Purchase'
import './styles.css'

class Rigs extends Component {
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

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
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
    '/products',
  ]),
  connect(
    ({ firebase }) => ({
      products: dataToJS(firebase, 'products'),
    })
  )
)(Rigs)
