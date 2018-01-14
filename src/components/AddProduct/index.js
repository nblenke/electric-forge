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
      active: false
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

          <div className="panel panel-default">
            <div className="panel-heading">Add Rig</div>
            <div className="panel-body">

              <div className="form-group">
                <label>Title</label>
                <input
                  type='text'
                  className="form-control"
                  placeholder="Title"
                  ref={ref => { this.title = ref }} />
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type='text'
                  className="form-control"
                  placeholder="description"
                  ref={ref => { this.description = ref }} />
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
