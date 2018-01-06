import React, { Component } from 'react'
import GoogleButton from 'react-google-button'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import {
  firebaseConnect,
  isLoaded,
  pathToJS
} from 'react-redux-firebase'

class Login extends Component {
  googleLogin = loginData => {
    return this.props.firebase
      .login({ provider: 'google' })
      .then(() => {
        push('/')
      })
      .catch((error) => {
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError)
      })
  }

  render () {
    const { auth } = this.props

    if (auth && auth.isAnonymous) {
      return (
        <div>
          <GoogleButton onClick={this.googleLogin} />
        </div>
      )
    }

    return false
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
)(Login)
