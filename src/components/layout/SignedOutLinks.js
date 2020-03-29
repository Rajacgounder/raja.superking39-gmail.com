import React from "react";
import { NavLink } from "react-router-dom";
import {Dropdown} from "react-bootstrap";
const SignedOutLinks = () => {
  return (
    <ul className="navbar-nav ml-auto">
    <li className="nav-item">
     <Dropdown>
  <Dropdown.Toggle variant="primary" id="dropdown-basic">
    Login
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/signin">Manger Login</Dropdown.Item>
    <Dropdown.Item href="/Clientlogin">Client Login</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Key Role Login</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown></li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link">
          Sign up
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
