import { FILES_PATH } from './constants'

export const setProductImagePath = (productId, firebase) => {
  const storageRef = firebase.storage().ref()
  const ref = storageRef.child(`${FILES_PATH}/${productId}`)

  ref.getDownloadURL()
    .then((imgPath) => {
      firebase.update(`/products/${productId}`, { imgPath })
    })
    .catch((err) => {
      console.log(err.code)
    })
}
