import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Input from '../../components/Input'
import TextArea from '../../components/TextArea'
import './styles.css'

class ContactUs extends Component {
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

    // dev: http://localhost:5001/electric-forge-dev/us-central1/
    // prod: https://us-central1-electric-forge-dev.cloudfunctions.net

    fetch('https://us-central1-electric-forge-dev.cloudfunctions.net/contactUsMessenger', {
      method: 'post',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.forms.contactUsForm.values)
    })
    .then(() => {
      this.setState({ success: true })
    })
    .catch((error) => {
      console.log(error)
      this.setState({ errorMsg: 'An Error Occurred' })
    })
  }

  render () {
    const { invalid, pristine, submitting } = this.props

    return (
      <div className="contact-us-page container">
        {this.state.success ? (
          <div className="success-msg text-center">
            <h1>Thanks!</h1>
            <p>You will be contacted by Electric Forge.</p>
          </div>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <h1>Contact Us</h1>
            <div className="row">
              <div className="col-xs-12">
                <label>Name</label>
                <Field
                  ref={ref => { this.name = ref }}
                  component={Input}
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <label>Phone</label>
                <Field
                  ref={ref => { this.phone = ref }}
                  component={Input}
                  className="form-control"
                  type="tel"
                  id="phone"
                  name="phone"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <label>Email</label>
                <Field
                  ref={ref => { this.email = ref }}
                  component={Input}
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <label>Confirm Email</label>
                <Field
                  ref={ref => { this.email = ref }}
                  component={Input}
                  className="form-control"
                  type="email"
                  id="confirmEmail"
                  name="confirmEmail"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <label>Best Time to Contact</label>
                <Field
                  ref={ref => { this.bestTime = ref }}
                  component={Input}
                  className="form-control"
                  type="text"
                  id="bestTime"
                  name="bestTime"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <label>Comments</label>
                <Field
                  ref={ref => { this.comments = ref }}
                  component={TextArea}
                  className="form-control"
                  id="comments"
                  name="comments"
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
const mapStateToProps = state => ({
  forms: state.form,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    form: 'contactUsForm',
    keepDirtyOnReinitialize: true,
    validate: values => {
      const errors = {}
      const isValidEmail = str => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)

      if (!values.name) {
        errors.name = 'This field is required'
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
)(ContactUs)
