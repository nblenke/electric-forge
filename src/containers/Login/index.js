import React, { Component } from 'react'
import GoogleButton from 'react-google-button'
import { compose } from 'redux'
import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
import {
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'

class Login extends Component {
  componentDidUpdate() {
    const { auth, history } = this.props
    if (auth) {
      history.push('/')
    }
  }

  googleLogin = loginData => {
    return this.props.firebase
      .login({ provider: 'google' })
      .catch((error) => {
        console.log('there was an error', error)
        console.log('error prop:', this.props.authError)
      })
  }

  render () {
    const { auth } = this.props

    return (
      <div>
        {!auth ?
          <div>
            Sign In
              <GoogleButton onClick={this.googleLogin} />
          </div>
        : null }
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
)(Login)
