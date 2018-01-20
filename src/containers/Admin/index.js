import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import AddProduct from '../../components/AddProduct'
import ProductGrid from '../../components/ProductGrid'
import { Button, Modal } from 'react-bootstrap'

class Admin extends Component {
  constructor(props) {
    super(props)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.state = { showAddModal: false }
  }

  componentWillReceiveProps(nextProps) {
    const { auth, firebase, history } = this.props

    if (!auth.isLoaded) {
      return
    }

    if (auth.isEmpty) {
      return history.push('/login')
    }

    if (nextProps.profile.displayName && !nextProps.profile.admin) {
      firebase.auth().signOut()
      history.push('/')
    }

  }

  handleSignOut(ev) {
    ev.preventDefault()
    this.props.firebase.auth().signOut()
    window.location = '/'
  }

  handleClose() {
    this.setState({ showAddModal: false })
  }

  handleShow() {
    this.setState({ showAddModal: true })
  }

  render () {
    const { auth, profile, products } = this.props

    if (!profile.admin) {
      return false
    }

    return (
      <div>
        {auth && auth.displayName ? (
          <div>
            <h2>Admin</h2>

            <div className="row">
              <div className="col-xs-12">
                <Button onClick={this.handleShow}>Add Rig</Button>
                <Button onClick={this.handleSignOut} className="pull-right">Sign Out</Button>
              </div>
            </div>

            <h3>Rigs</h3>
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
    'products',
  ]),
  connect(
    ({ firebase: { auth, authError, profile, data: { products }} }) => ({
      auth,
      authError,
      products,
      profile,
    })
  )
)(Admin)
