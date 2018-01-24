import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Field, reduxForm } from 'redux-form'
import Input from '../Input'
import './styles.css'

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

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { firebase, id } = this.props

    firebase.setWithMeta(`/orders/${id}`, {
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phone: this.phone.value,
      orderId: id,
    }).catch((error) => {
      this.setState({ errorMsg: error.message })
    })

    firebase.update(`/products/${id}`, {
      purchased: true
    })

    this.setState({ success: true })
  }

  render () {
    const { product, invalid, pristine, submitting } = this.props
    const { description, imgPath, price, title } = product

    return (
      <div className="purchase-page">
        {this.state.success ? (
          <div className="success-msg text-center">
            <h1>Success!</h1>
            <p>You will be contacted by Electric Forge about your purchase.</p>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <p>You are purchasing:</p>
            <div className="panel panel-default">
              <div className="panel-heading">{title}</div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-xs-3">
                    {imgPath ? (
                      <div className="purchase__image-wrap">
                        <img src={imgPath} alt={title} />
                      </div>
                    ) : <div className="purchase__no-image"></div> }
                  </div>
                  <div className="col-xs-9">
                    <strong>{price}</strong><br />
                    {description}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <label>First Name</label>
                <Field
                  ref={ref => { this.firstName = ref }}
                  component={Input}
                  className="form-control"
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <label>Last Name</label>
                <Field
                  ref={ref => { this.lastName = ref }}
                  component={Input}
                  className="form-control"
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <label>Phone</label>
                <Field
                  ref={ref => { this.phone = ref }}
                  component={Input}
                  className="form-control"
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <label>Email</label>
                <Field
                  ref={ref => { this.email = ref }}
                  component={Input}
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <label>Confirm Email</label>
                <Field
                  ref={ref => { this.email = ref }}
                  component={Input}
                  className="form-control"
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                  placeholder="Confirm Email"
                />
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={pristine || submitting || invalid}>Submit</button>
            </div>

            {this.state.errorMsg ? (
              <div className="panel panel-danger">
                <div className="panel-heading">{this.state.errorMsg}</div>
              </div>
            ) : null }
          </form> )}
      </div>
    )
  }
}

export default compose(
  firebaseConnect([
    'orders',
    'products',
  ]),
  connect(
    ({
      firebase: { auth, authError, forms, profile, data: { orders, products }} }) => ({
      auth,
      authError,
      forms,
      products,
      profile,
    })
  ),
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    form: 'purchaseForm',
    keepDirtyOnReinitialize: true,
    validate: values => {
      const errors = {}
      const isValidEmail = str => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)

      if (!values.firstName) {
        errors.firstName = 'This field is required'
      }

      if (!values.lastName) {
        errors.lastName = 'This field is required'
      }

      if (values.email && !isValidEmail(values.email)) {
        errors.email = 'Must be a valid email address'
      }
      if (!values.email) {
        errors.email = 'This field is required'
      }

      if (values.confirmEmail && !isValidEmail(values.confirmEmail)) {
        errors.confirmEmail = 'Must be a valid email address'
      }
      if (values.confirmEmail !== values.email) {
        errors.confirmEmail = 'E-mail addresses must match'
      }

      if (!values.phone) {
        errors.phone = 'This field is required'
      }

      return errors
    },
  }),
)(Purchase)
