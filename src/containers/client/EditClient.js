import React, { Component } from 'react';
import firebase from '../../config/fbConfig';
import { Link } from 'react-router-dom';

class ClientEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
        emailid: '',
        password: '',
      phoneno: '',
      address: '',
      designation: '',
      companyname: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('client').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          name: board.name,
          emailid: board.emailid,
          password: board.password,
          phoneno: board.phoneno,
          address: board.address,
          designation: board.designation,
          companyname: board.companyname

        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name,emailid,password,phoneno,address,designation,companyname } = this.state;

    const updateRef = firebase.firestore().collection('client').doc(this.state.key);
    updateRef.set({
      name,
        emailid,
        password,
        phoneno,
        address,
        designation,
        companyname
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        emailid: '',
        password: '',
      phoneno: '',
      address: '',
      designation: '',
      companyname: ''
      });
      this.props.history.push("/show1/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
             <center>Edit Client</center>
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show1/${this.state.key}`} class="btn btn-primary">Client</Link></h4>
            <form onSubmit={this.onSubmit}>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="emailid">emailid</label>
                <input type="email" class="form-control" name="emailid" value={this.state.emailid} onChange={this.onChange} placeholder="xyz@gmail.com"/>
              </div>
              <div class="form-group">
                <label for="password">password</label>
                <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.onChange} placeholder="********" />
              </div>
              <div class="form-group">
                <label for="phoneno">Phone Number</label>
                <input type="number" class="form-control" name="phoneno" value={this.state.phoneno} onChange={this.onChange} placeholder="9876543211" />
              </div>
              <div class="form-group">
                <label for="address">Address</label>
                <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.onChange} placeholder="address" />
              </div>
              <div class="form-group">
                <label for="designation">Designation</label>
                <input type="text" class="form-control" name="designation" value={this.state.designation} onChange={this.onChange} placeholder="Designation" />
              </div>
              <div class="form-group">
                <label for="companyname">companyname</label>
                <input type="text" class="form-control" name="companyname" value={this.state.companyname} onChange={this.onChange} placeholder="companyname" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientEdit;
