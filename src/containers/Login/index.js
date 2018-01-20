import React, { Component } from 'react'
import GoogleButton from 'react-google-button'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'

class Login extends Component {
  componentDidUpdate() {
    const { auth, history } = this.props

    if (auth) {
      history.push('/admin')
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

    console.log(auth)

    return (
      <div>
        {auth.isEmpty ?
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
    ({ firebase: { auth, authError, profile } }) => ({
      auth,
      authError,
      profile
    })
  )
)(Login)
