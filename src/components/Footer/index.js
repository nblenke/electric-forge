import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <p className="footer__copy">&copy; 2018 Electric Forge, Inc. All rights reserved.</p>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  </footer>
)
