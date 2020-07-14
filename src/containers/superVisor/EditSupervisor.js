import React, { Component } from 'react';
import firebase from '../../config/fbConfig';
import { Link } from 'react-router-dom';

class Edit extends Component {

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
      experience: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('super_visors').doc(this.props.match.params.id);
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
          experience: board.experience

        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({ board: state });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, emailid, password, phoneno, address, designation, experience } = this.state;

    const updateRef = firebase.firestore().collection('super_visors').doc(this.state.key);
    updateRef.set({
      name,
      emailid,
      password,
      phoneno,
      address,
      designation,
      experience
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        emailid: '',
        password: '',
        phoneno: '',
        address: '',
        designation: '',
        experience: ''
      });
      this.props.history.push("/show/" + this.props.match.params.id)
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
              <center>EDIT KEY ROLE</center>
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Key Role</Link></h4>
            <center>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" style={{ width: "300px" }} />
                </div>
                <div class="form-group">
                  <label for="emailid">emailid</label>
                  <input type="email" class="form-control" name="emailid" value={this.state.emailid} onChange={this.onChange} placeholder="xyz@gmail.com" style={{ width: "300px" }} />
                </div>
                <div class="form-group">
                  <label for="password">password</label>
                  <input type="password" class="form-control" name="password" minLength="8" value={this.state.password} onChange={this.onChange} placeholder="********" style={{ width: "300px" }} />
                </div>
                <div class="form-group">
                  <label for="phoneno">Phone Number</label>
                  <input type="tel" class="form-control" name="phoneno" minLength="10" value={this.state.phoneno} onChange={this.onChange} placeholder="phone number" style={{ width: "300px" }} />
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <input type="text" class="form-control" name="address" value={this.state.address} onChange={this.onChange} placeholder="address" style={{ width: "300px" }} />
                </div>
                {/* <div class="form-group">
                  <label for="designation">Designation</label>
                  <input type="text" class="form-control" name="designation" value={this.state.designation} onChange={this.onChange} placeholder="Designation" style={{ width: "300px" }} />
                </div> */}
                <div class="form-group">
                  <label for="designation">Designation</label>
                  <select style={{ width: "300px" }} required
                    value={this.state.designation}
                    onChange={this.onChange}
                    set name="designation"
                    class="form-control">
                    <option value="DS" > Select Designation</option>
                    <option value="Technical Team Leader">Technical Team Leader</option>
                    <option value="IT Architect">IT Architect</option>
                    <option value="Test Lead">Test Lead</option>
                    <option value="Program Manager">Program Manager</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="experience">Experience</label>
                  <input type="text" class="form-control" name="experience" min="18" value={this.state.experience} onChange={this.onChange} placeholder="experience" min="6" max="18" style={{ width: "300px" }} />
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
              </form>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
