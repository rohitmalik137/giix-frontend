import React, { Component } from 'react';

import './form-input.styles.scss';
import axios from 'axios';

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: '',
    };
  }

  handleChange = (event) => {
    this.setState({ files: event.target.files });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    var formData = new FormData();
    for (const key of Object.keys(this.state.files)) {
      formData.append('filesArray', this.state.files[key]);
    }
    axios
      .post('http://localhost:5000/files/upload', formData, {})
      .then((res) => {
        console.log(res.data);
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input type="file" onChange={this.handleChange} multiple />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
      </form>
    );
  }
}

export default FormInput;
