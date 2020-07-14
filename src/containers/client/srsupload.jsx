import React, { Component } from 'react';
import { storage } from '../../config/fbConfig';
import './upload.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { Alert } from 'react-alert'

class fileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleChange = e => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      this.setState(() => ({ file }));
    }
  }

  handleUpload = () => {
    const { file } = this.state;
    alert("Are you sure want upload the document!");
    console.log(file);
    const uploadTask = storage.ref(`document/${file.name}`).put(file);
    alert("empty!")
    uploadTask.on('state_changed',
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({ progress });
        toast.success('File Uploaded successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      (error) => {
        //  alert("File not uploaded");
        // error function ....
        console.log("file not uploaded", error);
        toast.error('Something went wrong!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      () => {
        // complete function ....
        storage.ref('document').child(file.name).getDownloadURL().then(url => {
          console.log(url);
          this.setState({ url });
        })
      });
  }
  render() {
    const style = {
      height: '500%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={style}>
        {/* <img src={this.state.url || 'gs://tool-5981d.appspot.com'} alt="Uploaded Document" height="300" width="400"/> */}
        <a href={this.state.url || 'storage.googleapis.com/document'} /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <progress value={this.state.progress} max="100" />
        <br />
        <input type="file" onChange={this.handleChange} />
        <button class="btn btn-primary" onClick={this.handleUpload}>Upload</button>
        <br />
      </div>
    )
  }
}

export default fileUpload;