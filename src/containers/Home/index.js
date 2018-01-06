import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS,
} from 'react-redux-firebase'
import TodoItem from '../../TodoItem'
import Login from '../../Login'


class App extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  handleAdd = () => {
    const { firebase } = this.props
    firebase.push('/todos', { text: this.input.value, done: false })
    // newTodo.value = ''
  }

  handleClick = (ev) => {
    // const { auth, firebase } = this.props
    //
    // firebase.push('/players', {
    //   [auth.uid]: {
    //     0: {
    //       x: ev.screenX,
    //       y: ev.screenY,
    //     }
    //   }
    // })
  }

  render () {
    const { ships, todos } = this.props
    const todosList = (!isLoaded(todos))
      ? 'Loading'
      : (isEmpty(todos))
        ? 'Todo list is empty'
        : Object.keys(todos).map((key) => (
          <TodoItem key={key} id={key} todo={todos[key]} />
        ))

    return (
      <div className='App'>
        <div className='App-todos'>
          <h4>Todos List</h4>
          {todosList}
          <h4>New Todo</h4>
          <input type='text' ref={ref => { this.input = ref }} />
          <button onClick={this.handleAdd}>
            Add
          </button>
        </div>
        <Login />
      </div>
    )
  }
}

export default compose(
  firebaseConnect([
    '/todos',
    // { type: 'once', path: '/todos' } // for loading once instead of binding
    // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
    // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
    // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
    // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
  ]),
  connect(
    ({ firebase }) => ({
      auth: pathToJS(firebase, 'auth'),
      todos: dataToJS(firebase, 'todos'),
    })
  )
)(App)
