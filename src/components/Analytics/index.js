import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import ReactGA from 'react-ga'

class Analytics extends Component {
  componentDidMount() {
    const { location } = this.props
    const { pathname, search } = location

    ReactGA.initialize('UA-113019256-1')
    ReactGA.pageview(`${pathname}${search}`)
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    const { key, pathname, search } = location

    if (key !== prevProps.location.key) {
      ReactGA.pageview(`${pathname}${search}`)
    }
  }

  render() {
    return false
  }
}

export default withRouter(Analytics)
