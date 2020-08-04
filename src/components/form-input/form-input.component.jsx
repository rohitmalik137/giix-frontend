import React, { Component } from 'react';

import './form-input.styles.scss';
import axios from 'axios';
import CustomButton from '../custom-button/custom-button.component';

class FormInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: '',
      filess: '',
      customName: null,
      id: null,
    };
  }

  handleUpdate = (name, id) => {
    axios.post('files/updatename', { name, id });
  };

  componentDidMount() {
    this.callAPI();
  }

  componentDidUpdate() {
    this.callAPI();
  }

  callAPI() {
    axios.get('files').then((res) => {
      //   console.log(res.data.files);
      this.setState({ filess: res.data.files });
    });
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
      .post('files/upload', formData, {})
      .then((res) => {
        console.log(res.data);
        alert('uploaded!');
      })
      .then(() => {
        document.getElementById('myForm').reset();
      })
      .catch((error) => {
        document.getElementById('myForm').reset();
        alert('please upload .pdf or .txt files only');
      });
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit} id="myForm">
          <div>
            <input type="file" onChange={this.handleChange} multiple />
          </div>
          <hr />
          <div className="button">
            <CustomButton isGoogleSignIn> Upload </CustomButton>
          </div>
        </form>
        <hr />
        <div>
          <table>
            <thead>
              <tr>
                <th>FileName</th>
                <th>CustomName</th>
                <th>Path</th>
                <th>CreatedAt</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {this.state.filess !== ''
                ? this.state.filess.map((data) => {
                    return (
                      <tr key={data._id}>
                        <td>{data.files}</td>
                        <td>{data.customName}</td>
                        <td>{data.filePath}</td>
                        <td>{data.createdAt}</td>
                        <td
                          onClick={() => {
                            const name = prompt('Enter Custom File Name');
                            if (name) {
                              this.handleUpdate(name, data._id);
                            }
                          }}
                          className="edit"
                        >
                          Edit
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FormInput;
