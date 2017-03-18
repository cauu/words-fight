import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <div className="root">
        <div className="body-constraint">
          { children }
        </div>
      </div>
    );
  }
}

export default App;