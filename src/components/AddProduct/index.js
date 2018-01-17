import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  dataToJS,
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'
import './styles.scss'

let that

class AddProduct extends Component {
  constructor(props) {
    super(props)
    that = this
    this.state = {
      showSuccess: false
    }
  }
  handleAdd = () => {
    const { firebase } = this.props

    firebase.pushWithMeta('/products', {
      title: this.title.value,
      description: this.description.value,
      ethermineId: this.ethermineId.value,
      price: this.price.value,
      purchased: false,
    }).then(function() {
      that.setState({
        showSuccess: true
      })
      setTimeout(function() {
        that.setState({
          showSuccess: false
        })
      }, 1000)
    });
  }

  render () {
    const { showSuccess } = this.state

    return (
      <div className="row add-product">
        <div className="col-xs-12 col-sm-6">

          <div className="form-group">
            <label>Title</label>
            <input
              type='text'
              className="form-control"
              ref={ref => { this.title = ref }} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type='text'
              className="form-control"
              ref={ref => { this.description = ref }} />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type='text'
              className="form-control"
              ref={ref => { this.price = ref }} />
          </div>

          <div className="form-group">
            <label>Ethermine ID</label>
            <input
              type='text'
              className="form-control"
              ref={ref => { this.ethermineId = ref }} />
          </div>

          <div className="form-group">
            <button
              className="btn btn-primary"
              onClick={this.handleAdd}
              disabled={showSuccess ? true : false}>Add
            </button>
          </div>

          <div className="row">
            <div className="col-xs-12">
              {showSuccess
                ? <div className="panel panel-success">
                    <div className="panel-heading">Rig Added Successfully</div>
                  </div>
                : null }
            </div>
          </div>

        </div>
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
      authError: pathToJS(firebase, 'authError'),
      auth: pathToJS(firebase, 'auth'),
      products: dataToJS(firebase, 'products'),
      profile: pathToJS(firebase, 'profile')
    })
  )
)(AddProduct)
