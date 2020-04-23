import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getConsents,
  updateTermsAndCondition,
} from "../../store/actions/consentAction";

class Premission extends Component {
  state = {
    isAccepted: false,
  };
  componentDidMount() {
    this.props.getConsents();
  }

  handleSubmit = () => {
    let superVisorAuthL =
      JSON.parse(localStorage.getItem("superVisorAuth")) || [];
    this.props.updateTermsAndCondition(
      this.state.isAccepted,
      superVisorAuthL[0].id
    );
    this.props.history.push("/superVisor");
  };

  render() {
    const { consents } = this.props;
    return (
      <div>
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
        <center>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              this.handleSubmit();
            }}
          >
            <input
              type="radio"
              id="accepted"
              name="terms"
              value="male"
              required
              onChange={(e) => {
                this.setState({ isAccepted: true });
              }}
            />
            <label for="accepted">
              I accept terms and conditions of consents
            </label>
            <br />
            <input
              type="radio"
              id="notAccepted"
              name="terms"
              value="female"
              onChange={(e) => {
                this.setState({ isAccepted: false });
              }}
            />
            <label for="notAccepted">
              I do not accept terms and conditions of consents
            </label>
            <br />
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </center>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConsents: () => {
      dispatch(getConsents());
    },
    updateTermsAndCondition: (isAccepted, userId) => {
      dispatch(updateTermsAndCondition(isAccepted, userId));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    consents: state.project.projects,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Premission);
