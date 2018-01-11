import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'
// import { Link } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut(ev) {
    ev.preventDefault()
    this.props.firebase.auth().signOut()
  }

  render () {
    const { auth } = this.props

    return (
      <div>

      <Navbar inverse collapseOnSelect>
    		<Navbar.Header>
    			<Navbar.Brand>
    				<a href="/">Electric Forge</a>
    			</Navbar.Brand>
    			<Navbar.Toggle />
    		</Navbar.Header>
    		<Navbar.Collapse>
    			<Nav>
    				<NavItem href="/about">
    					About
    				</NavItem>
    			</Nav>

          {auth && auth.displayName ? (
            <Nav pullRight>
              <NavItem href="/account">
                My Account
              </NavItem>

              <NavItem onClick={this.handleSignOut}>
                Sign Out
              </NavItem>
            </Nav>
          ) : (
            <Nav pullRight>
              <NavItem href="/login">
                Sign In
              </NavItem>
            </Nav>
          )}

    		</Navbar.Collapse>
    	</Navbar>

      <header>
      </header>
      </div>
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
