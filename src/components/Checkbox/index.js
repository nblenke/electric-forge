import React from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({
  className,
  defaultChecked,
  input,
  label,
  meta,
  id,
  touched = meta.touched,
  error = meta.error,
}) => (
  <div
    className={`has-feedback${touched && error ? ' has-error' : ''}${touched && !error
      ? ' has-success'
      : ''} ${className || ''}`}>
    <input
      {...input}
      defaultChecked={defaultChecked}
      type="checkbox"
      id={id}
      className="checkbox__element"
    />
    {/* <label htmlFor={id} className="checkbox__label">
      {label}
    </label> */}
  </div>
)

export default Checkbox

Checkbox.propTypes = {
  className: PropTypes.string,
  defaultChecked: PropTypes.bool,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  id: PropTypes.string,
  touched: PropTypes.bool,
  error: PropTypes.bool,
}
