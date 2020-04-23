import React, { Component } from 'react';
import firebase from '../../config/fbConfig';
import { Link } from 'react-router-dom';

class ClientShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},

      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('client').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('client').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/ClientData">Client Data</Link></h4>
            <h3 class="panel-title">
              {this.state.board.name}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Email id:</dt>
              <dd>{this.state.board.emailid}</dd>
              <dt>Password:</dt>
              <dd>{this.state.board.password}</dd>
              <dt>Phone Number:</dt>
              <dd>{this.state.board.phoneno}</dd>
              <dt>Address:</dt>
              <dd>{this.state.board.address}</dd>
              <dt>Desigation:</dt>
              <dd>{this.state.board.designation}</dd>
              <dt>companyname:</dt>
              <dd>{this.state.board.companyname}</dd>
            </dl>
            <Link to={`/react/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ClientShow;
