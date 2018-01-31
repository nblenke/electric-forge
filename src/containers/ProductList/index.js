import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import ProductGrid from '../../components/ProductGrid'
import './styles.css'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.toggleListView = this.toggleListView.bind(this)
    this.state = {
      isListView: false,
    }
  }

  toggleListView(bool) {
    this.setState({ isListView: bool })
  }

  render () {
    const { products } = this.props
    const {isListView} = this.state

    return (
      <div className="product-list container">
        <div className="row">
          <div className="col-xs-12">
            <h3 className="product-list__title">Rigs for Sale

              <span className="pull-right product-list__view-toggle">
                <button
                  className={`btn btn-default${isListView ? '' : ' active'}`}
                  onClick={() => this.toggleListView(false)}>
                  <i className="fa fa-th" aria-hidden="true"></i>
                  </button>
                <button
                  className={`btn btn-default${isListView ? ' active' : ''}`}
                  onClick={() => this.toggleListView(true)}>
                  <i className="fa fa-th-list" aria-hidden="true"></i>
                  </button>
              </span>
            </h3>
          </div>
        </div>
        <div className="row">
          <ProductGrid products={products} showPurchased={false} isListView={isListView} />
        </div>
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
)(ProductList)
