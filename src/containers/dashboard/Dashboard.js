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
import Notification from "../../assets/images/notification.jpg";
import Profile from "../../assets/images/profile.png";
import Key from "../../assets/images/key.jpg";
import Keyrole from "../../assets/images/viewkey.jpg";
import Team from "../../assets/images/viewTeam.png";

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
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
              <Link to="/viewFile">
                <div class="section-style">
                  <img src={Srs} height="200" width="350" alt="SRS" />
                  <p>Client SRS</p>
                </div>
              </Link>
              <Link to="/Times">
              <div class="section-style">
                <img src={Profile} height="200" width="400" alt="" />
                <p>SET DURATION</p>
              </div></Link> 
              <Link to="/SupervisorShow">
                <div class="section-style">
                  <img src={Key} height="200" width="400" alt="" />
                  <p>View Key Roles</p>
                </div>
              </Link>
            </div>

            <div class="image-section">
              <Link to="/CreateProject">
                <div class="section-style">
                  <img src={Consent} height="100" width="400" alt="" />
                  <p>Consent</p>
                </div>
              </Link>

              <Link to="/ViewSupervisor">
                <div class="section-style">
                  <img src={Keyrole} height="200" width="400" alt="" />
                  <p>Select Roles</p>
                </div>
              </Link>
              <Link to="/Notification">
                <div class="section-style">
                  <img src={Notification} height="200" width="400" alt="" />
                  <p>Notifications</p>
                </div>
              </Link>
            </div>
            <div class="image-section">
            <Link to="/ClientData">
              <div class="section-style">
                <img src={Notification} height="200" width="400" alt=""/>
                <p>Client Profile</p>
              </div></Link>
              <Link to="/viewTeams">
              <div class="section-style">
                <img src={Team} height="200" width="400" alt=""/>
                <p>View Teams</p>
              </div></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // projects: state.firestore.ordered.projects,
  auth: state.firebase.auth,
  // notifications: state.firestore.ordered.notifications
});

// export default compose(connect(mapStateToProps),firestoreConnect([{collection: 'projects', orderBy: ['createdAt', 'desc']},{collection: 'notifications', limit:5, orderBy:['time', 'desc']}]))(Dashboard);
export default compose(connect(mapStateToProps))(Dashboard);
