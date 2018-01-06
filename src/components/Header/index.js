import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isEmpty,
  pathToJS
} from 'react-redux-firebase'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
    this.handleSignOut = this.handleSignOut.bind(this)
  }

  componentDidMount() {
    const { firebase } = this.props
    firebase.auth().onAuthStateChanged(function(user) {
      if (isEmpty(user)) {
        firebase.auth().signInAnonymously()
      }
    });
  }

  handleSignOut(ev) {
    ev.preventDefault()
    this.props.firebase.auth().signOut()
  }

  render () {
    const { auth } = this.props

    return (
      <header>
        Header<br />
        {auth && auth.displayName ? (
          <div>
            <div>Welcome {auth.displayName}({auth.email})</div>
            <Link to="/account">My Account</Link> |
            <Link to="" onClick={this.handleSignOut}>Sign Out</Link>
          </div>
        ) : (
          <div>
            <Link to="/login">Sign In</Link>
          </div>
        )}
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </header>
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
