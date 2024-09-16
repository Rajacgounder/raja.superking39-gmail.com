import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
// import { signOut } from "../../store/actions/clientAction";
// import { signOut } from "../../store/actions/projectActions";

const SignedInLinks = (props) => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        {/* <NavLink to="/create" className="nav-link">
          Create
        </NavLink> */}
      </li>
      <li className="nav-item">
        {/* <NavLink exact to="/" className="nav-link">
          Dashboard
        </NavLink> */}
      </li>
      <li className="nav-item">
        <a className="nav-link">
          {props.profile.firstName} 
        </a>
      </li>
      <li className="nav-item">
        <a href="/" onClick={props.signOut} className="nav-link">
        <i class="fas fa-sign-out-alt"></i>
        </a>
      </li>
      
    </ul>
  );
};

export default connect(
  null,
  { signOut }
)(SignedInLinks);
