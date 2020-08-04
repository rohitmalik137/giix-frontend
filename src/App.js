import React, { Component } from 'react';
import './App.css';

import FormInput from './components/form-input/form-input.component';
// import ShowInfo from './components/show-info/show-info.components';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormInput />
        {/* <ShowInfo /> */}
      </div>
    );
  }
}

export default App;
