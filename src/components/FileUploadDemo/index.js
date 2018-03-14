import React from 'react'
import axios, { post } from 'axios';

const FILE_UPLOAD_URL = `${process.env.REACT_APP_API_URL}/user/fileupload`;



class SimpleReactFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file);
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  fileUpload(file) {
    console.log('inside file upload::', file);
    let formData = new FormData();
    formData.append('file', file);
    console.log('formData::', formData);
    post(FILE_UPLOAD_URL, formData).then(response => {
      console.log('response::' + response);
    }).catch(error => {
      console.log('error::' + error);
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    )
  }
}



export default SimpleReactFileUpload