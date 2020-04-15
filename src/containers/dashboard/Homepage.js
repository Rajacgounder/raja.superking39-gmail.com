import React,{Component} from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link, NavLink } from "react-router-dom";
import { compose } from 'redux';
import { Redirect } from 'react-router-dom'

class Homepage extends Component{
    
    render(){
        const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
        return(
            <div className="home">
                <img src=""></img>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  })
  export default compose(connect(mapStateToProps),firestoreConnect([{collection: 'projects', orderBy: ['createdAt', 'desc']},{collection: 'notifications', limit:5, orderBy:['time', 'desc']}]))(Homepage);