import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import ProductSwiper from '../../components/ProductSwiper'
import './styles.css'
// import logo from './logo1.png'

class Home extends Component {
  render () {
    const { products } = this.props
    return (
      <div className="home-page">
        <section className="hero">
          <div className="container">
            {/*<img src={logo} alt="Logo" className="hero__logo" />*/}
            <div className="hero__copy">
              <h2>Start Mining Today!</h2>
              <h3>Electric Forge provides 100% of the resources and tools
               you need to mine CryptoCoins, including BitCoin and Ethereum</h3>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Operational Rigs</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <ProductSwiper products={products} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <h3>Available Rigs</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <ProductSwiper products={products} />
            </div>
          </div>
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
    ({ firebase: { auth, data: { products }} }) => ({
      auth,
      products,
    })
  )
)(Home)
