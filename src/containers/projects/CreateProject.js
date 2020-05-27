import React, { Component } from "react";
import { createProject } from "../../store/actions/projectActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getConsents } from "../../store/actions/consentAction";
import { Link } from 'react-router-dom';

class CreateProject extends Component {
  state = {
    content: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state, this.props.history);
  };

  componentDidMount() {
    this.props.getConsents();
  }


  render() {
    const { auth, loading } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    const { consents } = this.props;
    return (
      <div className="container my-5">
        <h1>Create new Consent</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="content">Rules</label>
            <textarea
              className="form-control"
              id="content"
              onChange={this.handleChange}
              value={this.state.content}
              placeholder="Rules"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark" disabled={loading}>
            Create
          </button>
          <h1>
            <center>Consent Form</center>
          </h1>

          {consents.length > 0 ? (
            consents.map((consent) => {
              return <p>{consent.content}</p>;

            })
          ) : (
              <p>Loading...</p>
            )}

          {/* <Link to={"/project/" + props.match.params.id + "/edit"}><button className="waves-effect btn right orange"><i className="material-icons left">mode_edit</i>Edit Consent</button></Link> */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  loading: state.project.isLoading,
  consents: state.project.projects,
});

export default connect(mapStateToProps, { createProject, getConsents })(
  CreateProject
);
