import React, { Component } from 'react';

import './show-info.styles.scss';
import axios from 'axios';

class ShowInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: '',
      customName: null,
      id: null,
    };
  }

  handleUpdate = (name, id) => {
    axios.post('http://localhost:5000/files/updatename', { name, id });
    this.forceUpdate();
  };

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
              <th>CustomName</th>
              <th>Path</th>
              <th>CreatedAt</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.files !== ''
              ? this.state.files.map((data) => {
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
                            // this.setState({
                            //   customName: name,
                            //   id: data._id,
                            // });
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
    );
  }
}

export default ShowInfo;
