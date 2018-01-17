import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  dataToJS,
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'
import AddProduct from '../../components/AddProduct'
import ProductGrid from '../../components/ProductGrid'
import { Button, Modal } from 'react-bootstrap'

class Account extends Component {
  constructor(...args) {
    super(...args);

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = { showAddModal: false };
  }

  handleClose() {
    this.setState({ showAddModal: false });
  }

  handleShow() {
    this.setState({ showAddModal: true });
  }
  render () {
    const { auth, products } = this.props

    return (
      <div>
        {auth && auth.displayName ? (
          <div>
            <h2>My Account</h2>
            <p>Welcome {auth.displayName}({auth.email})</p>

            <Button onClick={this.handleShow}>Add Rig</Button>

            <h3>My Rigs</h3>
            <div className="row text-center">
              <ProductGrid
                hasDelete={true}
                hasEdit={true}
                hasActiveToggle={true}
                products={products}
                showOnlyUser={true}
                showInactive={true}
                uid={auth.uid}
              />
            </div>

            <Modal show={this.state.showAddModal} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Rig</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <AddProduct />
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>

          </div>
        ) : null}
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
      authError: pathToJS(firebase, 'authError'),
      auth: pathToJS(firebase, 'auth'),
      products: dataToJS(firebase, 'products'),
      profile: pathToJS(firebase, 'profile')
    })
  )
)(Account)
