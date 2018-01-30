import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default () => (
  <div className="container how-to-purchase-page">
    <div className="row">
      <div className="col-xs-12">
        <h3>How To Purchase</h3>
        <p>You are free to browse and research the many Rigs available
        on our site. All our Rigs are operating and currently producing
        output for their respective cryptocurrencies. Many are
        available for sale today and once purchased, all future
        production will become yours.</p>

        <p>You may purchase these today by clicking on the purchase button
        located near each Rig. You may also
        <Link to="/contact-us">contact us</Link> if you would like a
        custom quote for a set custom built Rigs to meet your objectives.
        Our Commercial team is available and can help design a program for
        you. The minimum order is $50,000. You can complete this contact
        form or send an email to commercial.sales@electricforge.us.</p>

        <p>Our MSA can be found <Link to="/msa">here</Link>.</p>
      </div>
    </div>
  </div>
)
