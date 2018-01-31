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
      hasPrice,
      hasPurchaseBtn,
      id,
      onDelete,
      product,
    } = this.props

    const {
      coinType,
      description,
      ethermineActiveWorkers,
      ethermineAverageHashrate,
      // ethermineBtcPerMin,
      ethermineCoinsPerMin,
      // ethermineCurrentHashrate,
      // ethermineId,
      // ethermineUnpaid,
      // ethermineUsdPerMin,
      // ethermineValidShares,
      imgPath,
      kwh,
      price,
      purchased,
      title,
    } = product

    return (
      <div className={`product-item ${className ? className : ''}`}>
        <Link to={`/rig/${id}`} className="product-item__image-link">
          {imgPath ? (
            <div className="product-item__image" style={{ backgroundImage: `url(${imgPath})` }} />
          ) : <div className="product-item__no-image"></div> }
        </Link>
        <div className="caption">
          <h3 className="product-item__title"><Link to={`/rig/${id}`}>{title}</Link></h3>
          {typeof hasPrice !== undefined && hasPrice === false
            ? null
            : <p className="product-item__price">{price}</p>}
          {hasDescription && <p>{description}</p>}
          <p className="product-item__detail">
            <strong>Currently Mining:</strong> {coinType}<br />
            <strong>Current Monthly Production:</strong> {(ethermineCoinsPerMin * 43800).toFixed(5)} ETH<br />
            <strong>Active Workers:</strong> {ethermineActiveWorkers}<br />
            <strong>kWh:</strong> {kwh}<br />
            <strong>24 Hour Avg Hashrate:</strong> {(ethermineAverageHashrate/1000000).toFixed(1)} MH/s
          </p>
          {purchased || hasPurchaseBtn === false
            ? null
            : <Link to={`/rig/${id}`} className="btn btn-primary">Purchase</Link>}

          <div className="row">
            <div className="col-xs-12">
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
