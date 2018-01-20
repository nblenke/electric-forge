import { createStore, compose } from 'redux'
import rootReducer from './reducer'
import { reactReduxFirebase } from 'react-redux-firebase'
import firebase from 'firebase'

export default function configureStore (initialState, history) {

  // initialize firebase instance
  firebase.initializeApp({
    apiKey: "AIzaSyBlXqYzwqYTe5jZjoLYmbi8Kz5JpAs1uqw",
    authDomain: "electric-forge-dev.firebaseapp.com",
    databaseURL: "https://electric-forge-dev.firebaseio.com",
    projectId: "electric-forge-dev",
    storageBucket: "electric-forge-dev.appspot.com",
    messagingSenderId: "86629314111"
  }) // <- new to v2.*.*
  // firebase.firestore() // <- needed if using firestore

  const createStoreWithMiddleware = compose(
    reactReduxFirebase(firebase,
      {
        userProfile: 'users', // where profiles are stored in database
        // presence: 'presence', // where list of online users is stored in database
        // sessions: 'sessions', // where list of user sessions is stored in database (presence must be enabled)
        // enableLogging: false,
      }
    ),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)

  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
