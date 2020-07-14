import React, { Component } from "react";
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
import Team from "../../assets/images/viewTeam.jpg";
import Dates from '../../assets/images/date.png'
import Client from '../../assets/images/client.jpg'

class Dashboard extends Component {
  render() {
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container my-3">
        <div className="row">
          <div>
            <div class="image-section">
              <Link to="/viewFile">
                <div class="section-style">
                  <img src={Srs} height="300" width="400" alt="SRS" style={{ border: "solid" }} />
                  <p>Client SRS</p>
                </div>
              </Link>
              <Link to="/Times">
                <div class="section-style">
                  <img src={Profile} height="300" width="400" alt="" style={{ border: "solid" }} />
                  <p>Set Duration</p>
                </div></Link>
              <Link to="/SupervisorShow">
                <div class="section-style">
                  <img src={Key} height="300" width="400" alt="" style={{ border: "solid" }} />
                  <p>View Key Roles</p>
                </div>
              </Link>
            </div><br></br>

            <div class="image-section">
              <Link to="/CreateProject">
                <div class="section-style">
                  <img src={Consent} height="300" width="400" alt="" style={{ border: "solid" }} />
                  <p>Consent</p>
                </div>
              </Link>
              <Link to="/ViewSupervisor">
                <div class="section-style">
                  <img src={Keyrole} height="300" width="400" alt="" style={{ border: "solid" }} />
                  <p>Select Roles</p>
                </div>
              </Link>
              <Link to="/Notification">
                <div class="section-style">
                  <img src={Notification} height="300" width="400" alt="" style={{ border: "solid" }} />
                  <p>Notifications</p>
                </div>
              </Link>
            </div>
            <br></br>
            <div class="image-section">
              <Link to="/ClientData">
                <div class="section-style">
                  <img src={Client} height="200" width="400" alt="" style={{ border: "solid" }} />
                  <p>Client Profile</p>
                </div></Link>
              <Link to="/viewTeams">
                <div class="section-style">
                  <img src={Team} height="200" width="400" alt="" style={{ border: "solid" }} />
                  <p>View Team</p>
                </div></Link>
              <Link to="/viewDuration">
                <div class="section-style">
                  <img src={Dates} height="200" width="400" alt="" style={{ border: "solid" }} />
                  <p>View Duration</p>
                </div></Link>
            </div>
            <br>
            </br>
            <div class="image-section">
              <Link to="/updateConsent">
                <div class="section-style">
                  <img src={Consent} height="200" width="400" alt="" style={{ border: "solid" }} />
                  <p>Update Consent</p>
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
