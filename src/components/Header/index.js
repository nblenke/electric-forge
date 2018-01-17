import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import './styles.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut(ev) {
    ev.preventDefault()
    this.props.firebase.auth().signOut()
    window.location = '/'
  }

  render () {
    const { auth } = this.props

    return (
      <Navbar inverse collapseOnSelect>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<Link to="/" className="logo">
              <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" />
            </Link>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>
          <ul className="nav navbar-nav">
  			    <li><Link to="/about">How it works</Link></li>
            <li><Link to="/rigs">Rigs</Link></li>
          </ul>

          {auth && auth.displayName ? (
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/account">Account</Link></li>
              <li><a onClick={this.handleSignOut}>Sign Out</a></li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/login">Sign In</Link></li>
            </ul>
          )}
    		</Navbar.Collapse>
    	</Navbar>
    )
  }
}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase }) => ({
      authError: pathToJS(firebase, 'authError'),
      auth: pathToJS(firebase, 'auth'),
      profile: pathToJS(firebase, 'profile')
    })
  )
)(Header)
