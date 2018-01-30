import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { Field, reduxForm } from 'redux-form'
import Captcha from '../Captcha'
import Input from '../Input'
import Loading from '../Loading'
import './styles.css'

class Purchase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMsg: null,
      sending: false,
      success: false
    }
  }

  componentDidMount() {
    this.setState({ success: false })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { id } = this.props
    const payload = Object.assign({}, this.props.forms.purchaseForm.values)

    payload.orderId = id
    payload.createdAt = Date.now()
    delete payload.captcharesponse
    delete payload.confirmEmail

    this.setState({ sending: true })

    fetch('https://us-central1-electric-forge-dev.cloudfunctions.net/purchase', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(() => {
      this.setState({
        sending: false,
        success: true
      })
    })
    .catch((error) => {
      console.log(error)
      this.setState({
        errorMsg: 'An Error Occurred',
        sending: false
      })
    })
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
            <p>Thank you for your interest in {title}. Please complete the
            form below and someone from Electric Forge will contact you in
            the next 24 hours to arrange payment and to transfer the
            rig to your account.</p>
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

            <div className="form-group recaptcha-container">
              <label className="sr-only" htmlFor="recaptcha">
                Recaptcha
              </label>
              <Field name="captcharesponse" component={Captcha} />
              {/* Hidden label for hidden Recaptcha generated textarea field */}
              <label className="sr-only" aria-hidden="true" htmlFor="g-recaptcha-response">
                Recaptcha Response
              </label>
            </div>

            <div className="form-group">
              {this.state.sending
                ? <Loading />
                : <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={pristine || submitting || invalid}>Submit</button>}
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

const mapStateToProps = state => ({
  forms: state.form,
})

export default compose(
  connect(mapStateToProps),
  firebaseConnect([
    'orders',
    'products',
  ]),
  connect(
    ({
      firebase: { auth, authError, profile, data: { orders, products }} }) => ({
      auth,
      authError,
      products,
      profile,
    })
  ),
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    form: 'purchaseForm',
    fields: ['captcharesponse'],
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

      if (!values.captcharesponse) {
        errors.captcharesponse = 'This field is required'
      }

      return errors
    },
  }),
)(Purchase)
