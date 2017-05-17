import React, { Component, PropTypes } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children, location } = this.props
    return (
      <div location={location}>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Router
  children: PropTypes.node // eslint-disable-line
}

export default App;
