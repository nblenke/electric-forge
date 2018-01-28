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
              <h2>Mining as a Service</h2>
              <h3>Own your own mining production today!</h3>
              <p>Electric Forge develops and supports Cryptocurrency
              platforms and tools. Our scope is beyond any single
              Cryptocurrency network, and we encompass many of the
              emerging networks and exchanges.</p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h3>Rigs for Sale</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <ProductSwiper products={products} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <h3>See some of our Rigs in Operation</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <ProductSwiper products={products} hasPrice={false} />
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
