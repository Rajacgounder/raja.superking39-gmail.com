import React, { Component } from "react";
// import Notifications from "./Notifications";
// import ProjectList from "../projects/ProjectList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, NavLink } from "react-router-dom";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import "./dash.css";
import Srs from "../../assets/images/srs.png";
import Consent from "../../assets/images/consent.jpg";
import Duration from "../../assets/images/duration.jpg";

class SupervisorDash extends Component {
  render() {
    const { projects, auth, notifications, superVisorAuthState } = this.props;
    let superVisorAuthL =
      JSON.parse(localStorage.getItem("superVisorAuth")) || [];
    if (!superVisorAuthState.length && !superVisorAuthL.length) {
      return <Redirect to="/signin" />;
    }

    let disabledStylesForTimeDuration = {};
    if (
      superVisorAuthL.length &&
      !superVisorAuthL[0].doTermsAndConditionsAccepted
    ) {
      disabledStylesForTimeDuration = { pointerEvents: "none", opacity: 0.7 };
    }

    let disabledStylesForConsent = {};
    if (
      superVisorAuthL.length &&
      !superVisorAuthL[0].doShowConsentForm
    ) {
      disabledStylesForConsent = { pointerEvents: "none", opacity: 0.7 };
    }

    // let disabledStylesForConsent = {};
    // if (
    //   superVisorAuthL.length &&
    //   superVisorAuthL[0].hasSelectedTermsAndConditions
    // ) {
    //   disabledStylesForConsent = { pointerEvents: "none", opacity: 0.7 };
    // }

    return (
      <div className="dashboard container my-3">
        <div className="row">
          {/* <div className="col-sm-12 col-md-6 project-list">
            <ProjectList projects={projects} />
          </div>
          <div className="col-sm-12 col-md-6">
            <Notifications notifications={notifications} />
          </div> */}
          <div>
            {/* <Link to="/Consent" className="navbar-brand ml-3 ml-md-0">
          Consent <i className="text-danger fas fa-box-open mx-1"></i>
        </Link>
        <Link to="/Upload" className="navbar-brand ml-3 ml-md-0">
          Upload <i className="text-danger fas fa-box-open mx-1"></i>
        </Link>
        <Link to="/final" className="navbar-brand ml-3 ml-md-0">
          REquest <i className="text-danger fas fa-box-open mx-1"></i>
        </Link> */}

            <div class="image-section">
              <div class="section-style">
                <img src={Srs} height="200" width="350" alt="" />
                <p>VIEW SRS</p>
              </div>

              {/* <div style={disabledStylesForConsent}> */}
              <div style={disabledStylesForConsent}>
                <Link to="/Premission">
                  <div class="section-style">
                    <img src={Consent} height="200" width="350" alt="" />
                    <p>VIEW CONSENT</p>
                  </div>
                </Link>
              </div>

              <div style={disabledStylesForTimeDuration}>
                <Link to="/Time">
                  <div class="section-style">
                    <img src={Duration} height="200" width="350" alt="" />
                    <p>SELECT TIME DURATION</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.firestore.ordered.projects,
  auth: state.firebase.auth,
  notifications: state.firestore.ordered.notifications,
  superVisorAuthState: state.auth.superVisorAuth,
});

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "projects", orderBy: ["createdAt", "desc"] },
    { collection: "notifications", limit: 5, orderBy: ["time", "desc"] },
  ])
)(SupervisorDash);
