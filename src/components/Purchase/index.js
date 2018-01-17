import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  dataToJS,
  firebaseConnect,
} from 'react-redux-firebase'
import { Link } from 'react-router-dom'

class Purchase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: null,
      success: false
    }
  }

  componentDidMount() {
    this.setState({ success: false })
  }

  handleSubmit = () => {
    const { firebase, id } = this.props

    const createNewUser = ({ email, password, username }) => {
      firebase.createUser(
        { email, password },
        { username, email }
      ).then(() => {
        firebase.logout()
        firebase.update(`/products/${id}`, {
          purchased: true
        })
        this.setState({ success: true })
      })
      .catch((error) => {
        console.log(error.message)
        this.setState({ errorMsg: error.message })
      })
    }

    createNewUser({
      email: this.email.value,
      password: 'test123',
      username: 'test'
    })
  }

  render () {
    const { product } = this.props

    return (
      <div className="purchase">
        {this.state.success ? (
          <div className="success-msg">
            <h2>Success!</h2>
            <p>You will be contacted by Electric Forge about your purchase.</p>
          </div>
        ) : null }

        <p>You are purchasing:</p>
        <div className="panel panel-default">
          <div className="panel-heading">{product.title}</div>
          <div className="panel-body">
            {product.description}<br />
            {product.price}<br />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type='text'
            className="form-control"
            ref={ref => { this.email = ref }} />
        </div>
        <div className="form-group">
          <label>Confirm Email</label>
          <input
            type='text'
            className="form-control"
            ref={ref => { this.emailConfirm = ref }} />
        </div>
        <div className="checkbox">
          <label>
            <input type="checkbox" />
            By checking this box you agree to the <Link to="/terms">Terms & Conditions</Link>.
          </label>
        </div>

        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleSubmit}>Buy</button>
        </div>

        {this.state.errorMsg ? (
          <div className="panel panel-danger">
            <div className="panel-heading">{this.state.errorMsg}</div>
          </div>
        ) : null }
      </div>
    )
  }
}

export default compose(
  firebaseConnect([
    '/products',
  ]),
  connect(
    ({ firebase }) => ({
      products: dataToJS(firebase, 'products'),
    })
  )
)(Purchase)
