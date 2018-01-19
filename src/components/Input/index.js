import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
  input,
  className,
  disabled,
  floatLabel,
  placeholder,
  label,
  stayClassName,
  type,
  id,
  meta: { touched, error, warning },
}) => (
  <div
    className={`form-group has-feedback${touched && error ? ' has-error' : ''}${touched && !error
      ? ' has-success'
      : ''}`}>
    <input
      {...input}
      disabled={disabled}
      placeholder={floatLabel ? null : placeholder}
      type={type}
      id={id}
      className={className}
    />
    {touched && error ? (
      <span className="glyphicon glyphicon-remove form-control-feedback" />
    ) : null}
    {touched && !error ? <span className="glyphicon glyphicon-ok form-control-feedback" /> : null}
    {/* touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>)) */}

    {floatLabel ? (
      <label htmlFor={id} className={stayClassName}>
        {placeholder}
      </label>
    ) : null}
  </div>
)

export default Input

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  floatLabel: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  stayClassName: PropTypes.string,
  type: PropTypes.string,
}
