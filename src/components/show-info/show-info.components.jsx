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
    console.log(this.state.files);
    return (
      <div>
        <h1>hello</h1>
        {/* {this.state.files !== '' ? this.state.files[0].files[0] : null} */}
        {this.state.files !== ''
          ? this.state.files.map((data) => {
              return data.files.map((subData) => {
                return <h3>{subData}</h3>;
              });
            })
          : null}
        <h1>there!</h1>
      </div>
    );
  }
}

export default ShowInfo;
