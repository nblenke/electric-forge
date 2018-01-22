import React, { Component } from 'react'
import GoogleButton from 'react-google-button'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Loading from '../../components/Loading'

class Login extends Component {
  componentDidUpdate() {
    const { auth, history } = this.props

    if (auth.isLoaded && !auth.isEmpty) {
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

    if (!auth.isLoaded) {
      return (
        <Loading />
      )
    }

    return (
      <div className="container">
        {auth && auth.isEmpty ?
          <GoogleButton onClick={this.googleLogin} />
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
