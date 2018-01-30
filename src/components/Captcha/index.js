import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import PropTypes from 'prop-types'

const sitekey = '6LcWQ0MUAAAAABAsxpF_fHATojRH-AOpqTzZAAlz'

// https://github.com/erikras/redux-form/issues/1880
const Captcha = props => (
  <div>
    {props.meta.touched && props.meta.error}
    <ReCAPTCHA sitekey={sitekey} onChange={response => props.input.onChange(response)} />
  </div>
)

export default Captcha

Captcha.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  onChange: PropTypes.func,
}
