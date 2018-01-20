import { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    // return this.props.children
    return false
  }
}

export default withRouter(ScrollToTop)

ScrollToTop.propTypes = {
  location: PropTypes.object,
}
