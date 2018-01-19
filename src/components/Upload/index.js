import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import { map } from 'lodash'
import Dropzone from 'react-dropzone'

// Path within Database for metadata (also used for file Storage path)
const filesPath = 'uploadedImages'

// Component Enhancer that adds props.firebase and creates a listener for
// files them passes them into props.uploadedImages
const enhance = compose(
  firebaseConnect([
    filesPath
  ]),
  connect(({ firebase: data }) => ({
    uploadedImages: data[filesPath]
  }))
)

const Uploader = ({ uploadedImages, firebase }) => {
  // Uploads files and push's objects containing metadata to database at dbPath
  const onFilesDrop = (files) => {
    // uploadFiles(storagePath, files, dbPath)
    return firebase.uploadFiles(filesPath, files, filesPath)
  }

  // Deletes file and removes metadata from database
  const onFileDelete = (file, key) => {
    // deleteFile(storagePath, dbPath)
    return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
  }
  return (
    <div>
      <Dropzone accept="image/jpeg, image/png, image/gif" onDrop={onFilesDrop}>
        <div>
          Drag and drop files here
          or click to select
        </div>
      </Dropzone>
      {
        uploadedImages &&
          <div>
            <h3>
              Uploaded file(s):
            </h3>
            {
              map(uploadedImages, (file, key) => (
                <div key={file.name + key}>
                  <span>{file.name}</span>
                  <button onClick={() => onFileDelete(file, key)}>
                    Delete File
                  </button>
                </div>
              ))
            }
          </div>
        }
    </div>
  )
}

export default enhance(Uploader)
