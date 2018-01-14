import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  dataToJS,
  firebaseConnect,
  pathToJS
} from 'react-redux-firebase'
//import { Link } from 'react-router-dom'

class AddProduct extends Component {
  handleAdd = () => {
    const { auth, firebase } = this.props

    firebase.push('/products', {
      title: this.title.value,
      description: this.description.value,
      uid: auth.uid,
      done: false
    })
  }

  render () {
    const { auth, products } = this.props

    return (
      <div>
        Title: <input type='text' ref={ref => { this.title = ref }} /><br />
        Description: <input type='text' ref={ref => { this.description = ref }} />
        <button onClick={this.handleAdd}>Add</button>
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
