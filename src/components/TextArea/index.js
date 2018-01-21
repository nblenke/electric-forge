import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({ className, disabled, id, input, placeholder, meta: { touched, error } }) => (
  <div
    className={`form-group has-feedback${touched && error ? ' has-error' : ''}${touched && !error
      ? ' has-success'
      : ''}`}>
    <textarea
      {...input}
      disabled={disabled}
      placeholder={placeholder}
      id={id}
      className={`form-control has-border ${className}`}
    />
    {touched && error ? (
      <span className="glyphicon glyphicon-remove form-control-feedback" />
    ) : null}
    {/* touched && !error ?
          <span className="glyphicon glyphicon-ok form-control-feedback"></span>
        : null */}
    {/* touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>)) */}
  </div>
)

export default TextArea

TextArea.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.object,
  placeholder: PropTypes.string,
  meta: PropTypes.object,
}
