import React, { Component } from "react";
import { createConsent } from "../../store/actions/consentAction";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { getConsents } from "../../store/actions/consentAction";

class Consent extends Component{
  state = {
    content: "",
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createConsent(this.state,this.props.history)
  };

  componentDidMount() {
    this.props.getConsents();
}

  render() {
    const { auth, loading } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    const { consents } = this.props;
    return (
      <div className="container my-5">
        <h1>Create new Consent</h1>
        <form onSubmit={this.handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              onChange={this.handleChange}
              value={this.state.email}
              aria-describedby="titleHelp"
              placeholder="Enter title"
              required
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="content">Rules</label>
            <textarea
              className="form-control"
              id="content"
              onChange={this.handleChange}
              value={this.state.content}
              placeholder="Content"
              required rows="15"
            />
          </div>
          <button type="submit" className="btn btn-dark" disabled={loading}>
            Create
          </button>
          <h1><center>Consent Form</center></h1>
                {consents.length > 0 ? consents.map(consent => {
                    return (
                        <p>{consent.content}</p> 
                    )
                }): <p>Loading...</p>}

          <button type="submit" className="btn btn-dark" disabled={loading}>
            Update
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  loading: state.project.isLoading,
  consents: state.project.projects
  
})

const mapDispatchToProps = dispatch => {
  return {
      getConsents: () => {
          dispatch(getConsents())
      }
  }
}



export default connect(mapStateToProps, { createConsent },mapDispatchToProps)(Consent);
