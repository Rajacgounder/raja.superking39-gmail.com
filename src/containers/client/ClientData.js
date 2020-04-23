import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';

class ClientData extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('client');
    this.unsubscribe = null;
    this.state = {
      keys: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const keys = [];
    querySnapshot.forEach((doc) => {
      const { name,emailid,password,phoneno,address,designation,companyname } = doc.data();
      keys.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        emailid,
        password,
        phoneno,
        address,
        designation,
        companyname,
      });
    });
    this.setState({
      keys
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
           <center>Client</center>   
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/CreateClient" class="btn btn-primary">Add Client Details</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email-ID</th>
                  <th>Password</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Designation</th>
                  <th>companyname</th>
                </tr>
              </thead>
              <tbody>
                {this.state.keys.map(board =>
                  <tr>
                    <td><Link to={`/show1/${board.key}`}>{board.name}</Link></td>
                    <td>{board.emailid}</td>
                    <td>{board.password}</td>
                    <td>{board.phoneno}</td>
                    <td>{board.address}</td>
                    <td>{board.designation}</td>
                    <td>{board.companyname}</td>
                    {/* <td><button type="submit" class="btn-primary">Consent</button></td> */}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


export default ClientData;