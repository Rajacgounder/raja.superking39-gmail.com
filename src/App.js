import React, { component, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProjectList from "./components/projects/ProjectList";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import Consent from "./consent/Consent";
import Upload from "./upload/Upload";
import Request from "./client/final"
import ClientDash from "./components/dashboard/ClientDash"
import KeyroleDash from "./components/dashboard/KeyroleDash"
import Roles from "./components/projects/Key"
import Duration from "./components/Keyroels/Timeduration"
import Client from "./components/auth/ClientLogin"
import ImageUpload from "./client/srsupload"
import Permission from "./consent/Premission"
import Keylogin from "./components/auth/Keylogin"
// import CreateProject from "./components/projects/CreateProject"



class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/project/:id" component={ProjectDetails} />
          <Route path="/create" component={CreateProject} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/Consent" component={Consent}/>
          <Route path="/Upload" component={Upload}/>
          <Route path="/final" component={Request}/>
          <Route path="/ClientDash" component={ClientDash}/>
          <Route path="/KeyroleDash" component={KeyroleDash}/>
          <Route path="/Key" component={Roles}/>
          <Route path="/Timeduration" component={Duration}/>
          <Route path="/ClientLogin" component={Client}/>
          <Route path="/srsupload" component={ImageUpload}/>
          <Route path="/Premission" component={Permission}/>
          <Route path="/Keylogin" component={Keylogin}/>
          <Route path="/CreateProject" component={CreateProject}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
