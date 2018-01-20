import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
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
          <Nav>
      			<NavItem eventKey={1} href="/about">How it works</NavItem>
            <NavItem eventKey={2} href="/rigs">Rigs</NavItem>
          </Nav>
    		</Navbar.Collapse>
    	</Navbar>
    )
  }
}

export default compose(
  firebaseConnect(),
  connect(
    ({ firebase: { auth, authError, profile } }) => ({
      auth,
      authError,
      profile,
    })
  )
)(Header)
