import React, {Component} from 'react';
import {storage} from '../../config/fbConfig';
import './upload.css'

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
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
      const image = e.target.files[0];
      this.setState(() => ({image}));
    }
  }
  handleUpload = () => {
      const {image} = this.state;
      console.log(image);
      const uploadTask = storage.ref(`document/${image.name}`).put(image);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // progrss function ....
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.setState({progress});
      }, 
      (error) => {
           // error function ....
        console.log(error);
      }, 
    () => {
        // complete function ....
        storage.ref('document').child(image.name).getDownloadURL().then(url => {
            console.log(url);
            this.setState({url});
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
      <a href={this.state.url  || 'storage.googleapis.com/document'}/>
      <progress value={this.state.progress} max="100"/>
      <br/>
        <input type="file"  onChange={this.handleChange}/>
        <button class="btn btn-primary" onClick={this.handleUpload}>Upload</button>
        <br/> 
      </div>
    )
  }
}

export default ImageUpload;