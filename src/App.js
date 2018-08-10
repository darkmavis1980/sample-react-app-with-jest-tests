import React, { Component } from 'react';
import './App.css';
import ComplexComponent from './components/ComplexComponent';
import SimpleComponent from './components/SimpleComponent';
import Snapshots from './components/Snapshots';

import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SimpleComponent />
        <ComplexComponent title="Hi Alex" />
        <hr />
        <Snapshots />
      </div>
    );
  }
}

export default App;
