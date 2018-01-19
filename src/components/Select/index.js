import React from 'react'
import PropTypes from 'prop-types'

const selectOptions = option => (
  <option key={option.value} value={option.value}>
    {option.label}
  </option>
)

const Select = ({ disabled, id, input, label, meta: { touched, error }, onClick, options }) => (
  <div
    className={`form-group has-feedback${touched && error ? ' has-error' : ''}${touched && !error
      ? ' has-success'
      : ''}`}>
    <select {...input} id={id} className="form-control" disabled={disabled} onClick={onClick}>
      <option value="">{label}</option>
      {options.map(selectOptions)}
    </select>
  </div>
)

export default Select

Select.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  onClick: PropTypes.func,
  options: PropTypes.array,
}
