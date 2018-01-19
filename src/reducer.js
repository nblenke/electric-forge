import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  firebase,
  form: formReducer,
})

export default rootReducer
