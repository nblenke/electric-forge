import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS,
} from 'react-redux-firebase'
import TodoItem from '../../components/TodoItem'

class Home extends Component {
  handleAdd = () => {
    const { firebase } = this.props
    firebase.push('/todos', {
      text: this.input.value,
      done: false
    })
  }

  render () {
    const { auth, todos } = this.props
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
          {todosList}

          {auth && auth.displayName ? (
            <div>
              <input type='text' ref={ref => { this.input = ref }} />
              <button onClick={this.handleAdd}>
                Add
              </button>
            </div>
          ) : null}

        </div>
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
)(Home)
