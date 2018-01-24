import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'
import { setProductImagePath } from '../../utils'
import { FILES_PATH } from '../../constants'
import './styles.css'

class AddProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSuccess: false,
      files: [],
    }
  }

  handleDrop = (files) => {
    this.setState({ files })
  }

  handleAdd = () => {
    const { firebase } = this.props
    const { files } = this.state

    firebase.pushWithMeta('/products', {
      birthDate: this.birthDate.value,
      coinType: this.coinType.value,
      description: this.description.value,
      ethermineId: this.ethermineId.value,
      kwh: this.kwh.value,
      price: this.price.value,
      purchased: false,
      title: this.title.value,
    }).then((ref) => {
      const productId = ref.path.pieces_[1]

      if (files.length) {
        firebase.uploadFile(FILES_PATH, files[0], null, {
          name: productId
        })
        .then(() => {
          setProductImagePath(productId, firebase)
          this.setState({ files: [] })
        })
        .catch((error) => {
          console.log(`upload file error: ${error}`)
        })
      }

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
          <textarea className="form-control" ref={ref => { this.description = ref }} />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="text" className="form-control" ref={ref => { this.price = ref }} />
        </div>
        <div className="form-group">
          <label>kWh</label>
          <input type="text" className="form-control" ref={ref => { this.kwh = ref }} />
        </div>
        <div className="form-group">
          <label>Birth Date</label>
          <input type="text" className="form-control" ref={ref => { this.birthDate = ref }} />
        </div>
        <div className="form-group">
          <label>Coin Type</label>
          <input type="text" className="form-control" ref={ref => { this.coinType = ref }} />
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
                  <div className="panel-heading">Rig Added</div>
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
    FILES_PATH,
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
    uploadedImages: data[FILES_PATH]
  }))
)(AddProduct)
