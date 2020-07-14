import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../../config/fbConfig";
import { Link } from "react-router-dom";

class CreateClient extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("client");
    this.state = {
      name: "",
      emailid: "",
      password: "",
      phoneno: "",
      address: "",
      designation: "",
      companyname: "",
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      emailid,
      password,
      phoneno,
      address,
      designation,
      companyname,
    } = this.state;

    this.ref
      .add({
        name,
        emailid,
        password,
        phoneno,
        address,
        designation,
        companyname,
      })
      .then((docRef) => {
        this.setState({
          name: "",
          emailid: "",
          password: "",
          phoneno: "",
          address: "",
          designation: "",
          companyname: "",
        });
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const {
      name,
      emailid,
      password,
      phoneno,
      address,
      designation,
      companyname,
    } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <center>ADD CLIENT</center>
            </h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/ClientData" class="btn btn-primary">
                CLIENT
              </Link>
            </h4>
            <center>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="name">Name:</label>
                  <input
                    type="text"
                    class="form-control"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    placeholder="Name"
                    style={{ width: "300px" }}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="emailid">emailid</label>
                  <input
                    type="email"
                    class="form-control"
                    name="emailid"
                    value={emailid}
                    onChange={this.onChange}
                    placeholder="xyz@gmail.com"
                    style={{ width: "300px" }}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password">password</label>
                  <input
                    type="password"
                    class="form-control"
                    name="password"
                    minLength="8"
                    value={password}
                    onChange={this.onChange}
                    placeholder="********"
                    style={{ width: "300px" }}
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="phoneno">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    name="phoneno"
                    value={phoneno}
                    onChange={this.onChange}
                    style={{ width: "300px" }}
                    pattern="[7-9]{1}[0-9]{9}"
                    placeholder="phone no"
                    required
                    minLength="10"
                  />
                </div>
                <div class="form-group">
                  <label for="address">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    name="address"
                    value={address}
                    onChange={this.onChange}
                    placeholder="address"
                    style={{ width: "300px" }}
                    required
                  />
                </div>
                {/* <div class="form-group">
                <label for="designation">Designation</label>
                <input
                  type="text"
                  class="form-control"
                  name="designation"
                  value={designation}
                  onChange={this.onChange}
                  placeholder="Designation"
                  required
                />
              </div> */}
                <div class="form-group">
                  <label for="companyname">Company Name</label>
                  <input
                    type="text"
                    class="form-control"
                    name="companyname"
                    value={companyname}
                    onChange={this.onChange}
                    placeholder="company name"
                    required
                    style={{ width: "300px" }}
                  />
                </div>
                <button type="submit" class="btn btn-success">
                  Submit
              </button>
              </form>
            </center>
          </div>
        </div>
      </div>
    );
  }
}
export default CreateClient;
