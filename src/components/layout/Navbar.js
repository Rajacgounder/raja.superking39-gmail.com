import React from "react";
import { Link, NavLink } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth, profile } = props;
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;
  return (
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container">
      <Link to="/" className="navbar-brand ml-3 ml-md-0">
          Software Project Duration Estimation Tool <i className="text-danger  mx-1"></i>
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars fa-2x" aria-hidden="true" />
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {links}
        </div>
      </div>
    </nav>
  );
};
const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps)(Navbar);
