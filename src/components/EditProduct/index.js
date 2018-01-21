import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import Dropzone from 'react-dropzone'
import { setProductImagePath } from '../../utils'
import { FILES_PATH } from '../../constants'
import './styles.css'

class EditProduct extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSuccess: false,
      files: [],
    }
  }

  handleSave = () => {
    const { firebase, id } = this.props

    firebase.update(`/products/${id}`, {
      title: this.title.value,
      description: this.description.value,
      ethermineId: this.ethermineId.value,
      price: this.price.value,
    }).then((ref) => {
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

  handleDrop = (files) => {
    this.setState({ files })
  }

  handleUpdateImage = () => {
    const { firebase, id } = this.props
    const { files } = this.state

    if (files.length) {
      firebase.uploadFile(FILES_PATH, files[0], null, {
        name: id
      })
      .then(() => {
        setProductImagePath(id, firebase)
        this.setState({ files: [] })
      })
      .catch((error) => {
        console.log(`upload file error: ${error}`)
        this.setState({ files: [] })
      })
    }
  }

  render () {
    const { product, id } = this.props
    const { description, ethermineId, imgPath, price, title } = product
    const { files } = this.state

    return (
      <div>
        <div className="form-group">
          <div className="row">
            <div className="col-xs-5">
              {imgPath ? (
                <img src={imgPath} alt={title} className="edit-product__image" />
              ) : <div className="edit-product__no-image"></div> }
            </div>
            <div className="col-xs-7">
              <label>Image</label>
              {files.length ? (
                files.map(file =>
                  <div key={file.name}>
                    <div className="panel panel-success">
                      <div className="panel-heading">Image Added: {file.name} - {file.size} bytes</div>
                    </div>
                    <button className="btn btn-default" onClick={this.handleUpdateImage}>Update</button>
                  </div>
                )
              ) : (
                <Dropzone
                  className="edit-product__dropzone form-control"
                  accept="image/jpeg, image/png, image/gif"
                  onDrop={this.handleDrop}>
                  Drag and drop image here or click
                </Dropzone>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>ID</label>
          <input
            type='text'
            disabled="disabled"
            className="form-control"
            defaultValue={id} />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input
            type='text'
            className="form-control"
            defaultValue={title}
            ref={ref => { this.title = ref }} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            defaultValue={description}
            ref={ref => { this.description = ref }} />
        </div>
        <div className="form-group">
          <label>Ethermine ID</label>
          <input
            type='text'
            className="form-control"
            defaultValue={ethermineId}
            ref={ref => { this.ethermineId = ref }} />
        </div>
        <div className="form-group">
          <label>price</label>
          <input
            type='text'
            className="form-control"
            defaultValue={price}
            ref={ref => { this.price = ref }} />
        </div>


        <div className="form-group">
          <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
        </div>

        <div className="row">
          <div className="col-xs-12">
            {this.state.showSuccess
              ? <div className="panel panel-success">
                  <div className="panel-heading">Rig Updated</div>
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
    'products',
  ]),
  connect(
    ({ firebase: { data: { products }} }) => ({
      products,
    })
  )
)(EditProduct)
