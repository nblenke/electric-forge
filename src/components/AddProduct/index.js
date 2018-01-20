import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'
import './styles.css'

const filesPath = 'uploadedImages'

class AddProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSuccess: false,
      files: [],
    }
  }

  setProductImagePath = (productId) => {
    const { firebase } = this.props
    const storageRef = firebase.storage().ref()
    const ref = storageRef.child(`uploadedImages/${productId}`)

    ref.getDownloadURL()
      .then((imgPath) => {
        firebase.update(`/products/${productId}`, { imgPath })
      })
      .catch((err) => {
        console.log(err.code)
      })
  }

  handleDrop = (files) => {
    this.setState({ files })
  }

  handleAdd = () => {
    const { firebase } = this.props

    firebase.pushWithMeta('/products', {
      title: this.title.value,
      description: this.description.value,
      ethermineId: this.ethermineId.value,
      price: this.price.value,
      purchased: false,
    }).then((ref) => {
      const productId = ref.path.pieces_[1]

      // TODO: this is sketchy, PERMISSION_DENIED error thrown but it works.
      // This is probably because the name option is a beta feature, see:
      // https://github.com/prescottprue/react-redux-firebase/issues/285
      firebase.uploadFile(filesPath, this.state.files[0], filesPath, {
        name: productId
      })
      .then(() => {
        this.setProductImagePath(productId)
      })
      .catch((err) => {
        this.setProductImagePath(productId)
      })

      this.setState({
        showSuccess: true
      })

      setTimeout(() => {
        this.setState({
          showSuccess: false
        })
      }, 1000)
    })
  }

  render () {
    const { files, showSuccess } = this.state

    return (
      <div className="add-product">

        <div className="form-group">
          <label>Image</label>
          {files.length ? (
            files.map(file =>
              <div className="panel panel-success" key={file.name}>
                <div className="panel-heading">Image Added: {file.name} - {file.size} bytes</div>
              </div>
            )
          ) : (
            <Dropzone
              className="add-product__dropzone form-control"
              accept="image/jpeg, image/png, image/gif"
              onDrop={this.handleDrop}>
              Drag and drop image here or click
            </Dropzone>
          )}
        </div>

        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" ref={ref => { this.title = ref }} />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input type="text" className="form-control" ref={ref => { this.description = ref }} />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="text" className="form-control" ref={ref => { this.price = ref }} />
        </div>

        <div className="form-group">
          <label>Ethermine ID</label>
          <input type="text" className="form-control" ref={ref => { this.ethermineId = ref }} />
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
    )
  }
}

export default compose(
  firebaseConnect([
    filesPath,
    'products',
  ]),
  connect(
    ({ firebase: { auth, authError, profile, data: { products }} }) => ({
      auth,
      authError,
      products,
      profile,
    })
  ),
  connect(({ firebase: data }) => ({
    uploadedImages: data[filesPath]
  }))
)(AddProduct)
