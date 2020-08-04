import React, { Component } from 'react';

import './show-info.styles.scss';
import axios from 'axios';

class ShowInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: '',
    };
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI() {
    axios.get('http://localhost:5000/files').then((res) => {
      //   console.log(res.data.files);
      this.setState({ files: res.data.files });
    });
  }

  render() {
    // console.log(this.state.files);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>FileName</th>
              <th>Path</th>
              <th>CreatedAt</th>
            </tr>
          </thead>
          <tbody>
            {this.state.files !== ''
              ? this.state.files.map((data) => {
                  return (
                    <tr key={data._id}>
                      <td>{data.files}</td>
                      <td>{data.filePath}</td>
                      <td>{data.createdAt}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ShowInfo;
