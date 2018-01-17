import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default () => (
  <footer>
    <div className="container">
      <div className="row">
        <Link to="/privacy">Privacy</Link> | <Link to="/terms">Terms</Link>
      </div>
    </div>
  </footer>
)
