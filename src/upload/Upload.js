import React, { Component } from "react";
// import Notifications from "./Notifications";
// import ProjectList from "../projects/ProjectList";
// import { connect } from 'react-redux';
// import { firestoreConnect } from 'react-redux-firebase';
// import { Link, NavLink } from "react-router-dom";
// import { compose } from 'redux';
// import { Redirect } from 'react-router-dom'
// import './upload/uploadcss'


class Upload extends Component{
    render(){
          return(
        // <nav class="navbar navbar-inverse">
  <div className="upload">
      <form>
          <textarea rows="20" cols="100" disabled=""/>
          <input type="text" class="form-control" id="usr" width="50" size="30"/>
          <button type="button" class="btn btn-primary">Upload File</button>
          <button type="button" class="btn btn-primary">Submit</button> 
      </form>
      </div>
    );
    }
}
export default (Upload);