import React, { Component } from 'react';

import './form-input.styles.scss';
import axios from 'axios';
import CustomButton from '../custom-button/custom-button.component';

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
        alert('uploaded!');
      });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div>
          <input type="file" onChange={this.handleChange} multiple />
        </div>
        <hr />
        <div className="button">
          <CustomButton isGoogleSignIn> Upload </CustomButton>
        </div>
      </form>
    );
  }
}

export default FormInput;
