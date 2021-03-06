import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Button, Modal } from 'react-bootstrap'
import Purchase from '../../components/Purchase'
import { getEthermineData } from '../../utils'
import './styles.css'

class ProductDetail extends Component {
  constructor(props) {
    super(props)
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.state = {
      hasFetched: false,
      showPurchaseModal: false,
    }
  }

  componentDidUpdate() {
    const { firebase, match, products } = this.props

    if (!products || this.state.hasFetched) {
      return
    }

    const productId = match.params.id
    const product = products[productId]

    this.setState({ hasFetched: true })
    getEthermineData(productId, product, firebase)
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
    const {
      birthDate,
      coinType,
      description,
      ethermineActiveWorkers,
      ethermineAverageHashrate,
      // ethermineBtcPerMin,
      ethermineCoinsPerMin,
      // ethermineCurrentHashrate,
      ethermineId,
      ethermineUnpaid,
      // ethermineUsdPerMin,
      // ethermineValidShares,
      imgPath,
      kwh,
      price,
      purchased,
      title,
    } = product

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            {imgPath ? (
              <div className="product-detail__image-wrap">
                <img src={imgPath} alt={title} />
              </div>
            ) : <div className="product-detail__no-image"></div> }
          </div>

          <div className="col-xs-12 col-sm-9">
            <h3 className="product-detail__title">{title}</h3>
            {purchased
            ? null
            : <h4 className="product-detail__price"><strong>Price:</strong> {price}</h4>}
            <p className="product-detail__miner-id">
              <strong>Miner Id:</strong>{' '}
              <a href={`https://ethermine.org/miners/${ethermineId}`} target="_blank">{ethermineId}</a>
            </p>
            <p className="product-detail__description">{description}</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-xs-12">
            <table className="table table-bordered table-striped product-detail__table">
              <tbody>
                <tr>
                  <td>Birth Date:</td>
                  <td>{birthDate}</td>
                </tr>
                <tr>
                  <td>Currently Mining:</td>
                  <td>{coinType}</td>
                </tr>
                <tr>
                  <td>Current Monthly Production:</td>
                  <td>{(ethermineCoinsPerMin * 43800).toFixed(5)} ETH</td>
                </tr>
                <tr>
                  <td>kWh:</td>
                  <td>{kwh}</td>
                </tr>
                <tr>
                  <td>Active Workers:</td>
                  <td>{ethermineActiveWorkers}</td>
                </tr>
                <tr>
                  <td>24 Hour Avg Hashrate:</td>
                  <td>{(ethermineAverageHashrate/1000000).toFixed(1)} MH/s</td>
                </tr>
                <tr>
                  <td>Unpaid Balance (in base units):</td>
                  <td>{ethermineUnpaid}</td>
                </tr>
              </tbody>
            </table>

            {purchased
            ? null
            : <button className="btn btn-primary btn-lg" onClick={this.handleShow}>Purchase Rig</button>}
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
