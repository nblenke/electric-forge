import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import AddProduct from '../../components/AddProduct'
import OrderItem from '../../components/OrderItem'
import ProductGrid from '../../components/ProductGrid'
import { Button, Modal } from 'react-bootstrap'
import { FILES_PATH } from '../../constants'

class Admin extends Component {
  constructor(props) {
    super(props)

    this.handleAddShow = this.handleAddShow.bind(this)
    this.handleAddClose = this.handleAddClose.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
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

  handleAddClose() {
    this.setState({ showAddModal: false })
  }

  handleAddShow() {
    this.setState({ showAddModal: true })
  }

  handleDelete(id, imgPath) {
    const { firebase } = this.props

    firebase.remove(`/products/${id}`)
      .then(() => {
        if (!imgPath) {
          return
        }
        firebase.deleteFile(`${FILES_PATH}/${id}`, null)
      })
  }

  render () {
    const { auth, orders, profile, products } = this.props

    if (!profile.admin || (auth && !auth.displayName)) {
      return false
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2>Admin</h2>
            <Button onClick={this.handleSignOut} className="pull-right">Sign Out</Button>
          </div>
        </div>

        {orders ? (
          <div className="row">
            <div className="col-xs-12">
              <h3>Orders</h3>
              <table className="table table-bordered table-responsive">
                <tbody>
                  {Object.keys(orders).map((key) => (
                    <OrderItem key={key} order={orders[key]} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null }

        <h3>Rigs <Button onClick={this.handleAddShow}>Add Rig</Button></h3>
        <div className="row">
          <ProductGrid
            hasDelete={true}
            hasEdit={true}
            hasActiveToggle={true}
            products={products}
            showPurchased={true}
            uid={auth.uid}
            onDelete={this.handleDelete}
          />
        </div>

        <Modal show={this.state.showAddModal} onHide={this.handleAddClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Rig</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddProduct />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleAddClose}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    )
  }
}

export default compose(
  firebaseConnect([
    'orders',
    'products',
  ]),
  connect(
    ({ firebase: { auth, authError, profile, data: { orders, products }} }) => ({
      auth,
      authError,
      orders,
      products,
      profile,
    })
  )
)(Admin)
