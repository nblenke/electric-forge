import React, { Component } from 'react'
import { firebase } from 'react-redux-firebase'
import { Button, Modal } from 'react-bootstrap'
import Moment from 'moment'

class OrderItem extends Component {
  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)

    this.state = {
      showModal: false,
    }
  }

  handleClose() {
    this.setState({ showModal: false })
  }

  handleShow(ev) {
    ev.preventDefault()
    this.setState({ showModal: true })
  }

  render() {
    const {
      key,
      order,
      orderId
    } = this.props

    const {
      createdAt,
      email,
      name,
      phone,
    } = order

    return (
      <tr key={key}>
        <td>
          <a href="" onClick={(ev) => this.handleShow(ev)}>{orderId}</a>

          <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Order #{orderId}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Date: {Moment(createdAt).format("YYYY-MM-DD hh:mma")}<br />
                Name: {name}<br />
                Email: {email}<br />
                Phone: {phone}<br />
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </td>
      </tr>
    )
  }
}
export default firebase()(OrderItem)
