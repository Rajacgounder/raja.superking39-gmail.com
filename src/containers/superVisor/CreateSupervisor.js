import React, { Component } from "react";
import ReactDOM from "react-dom";
import firebase from "../../config/fbConfig";
import { Link } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("super_visors");
    this.state = {
      name: "",
      emailid: "",
      password: "",
      phoneno: "",
      address: "",
      designation: "",
      experience: "",
      doTermsAndConditionsAccepted: false,
      hasSelectedTermsAndConditions: false,
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
      experience,
      doTermsAndConditionsAccepted,
      hasSelectedTermsAndConditions,
    } = this.state;

    this.ref
      .add({
        name,
        emailid,
        password,
        phoneno,
        address,
        designation,
        experience,
        doTermsAndConditionsAccepted,
        hasSelectedTermsAndConditions,
        doShowConsentForm: false,
      })
      .then((docRef) => {
        this.setState({
          name: "",
          emailid: "",
          password: "",
          phoneno: "",
          address: "",
          designation: "",
          experience: "",
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
      experience,
    } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              <center>ADD KEY ROLE</center>
            </h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/SupervisorShow" class="btn btn-primary">
                KEY roles
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
                    placeholder="phone no"
                    style={{ width: "300px" }}
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
                  style={{ width: "300px" }}
                  min="6"
                  max="18"
                  required
                />
              </div> */}
                <div class="form-group">
                  <label for="designation">Designation</label>
                  <select style={{ width: "300px" }} required
                    value={designation}
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
                  <label for="experience">Experience(in years)</label>
                  <input
                    type="number"
                    class="form-control"
                    name="experience"
                    min="6"
                    max="18"
                    value={experience}
                    onChange={this.onChange}
                    placeholder="experience"
                    style={{ width: "300px" }}
                    required
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
export default Create;
