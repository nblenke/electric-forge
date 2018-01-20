import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default () => (
  <footer>
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <Link to="/privacy">Privacy</Link> | <Link to="/terms">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
)
