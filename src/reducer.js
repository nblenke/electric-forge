import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { firebaseReducer } from 'react-redux-firebase'

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  form: formReducer,
  // firestore: firestoreReducer // <- needed if using firestore
})

export default rootReducer
