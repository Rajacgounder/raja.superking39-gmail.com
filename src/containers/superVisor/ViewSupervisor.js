import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';

class Keyshow extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('super_visors');
    this.unsubscribe = null;
    this.state = {
      keys: []
    };
  }

  handleCheck = ({doc, ...board}) => {
    console.log("board", board)
    firebase
      .firestore()
      .collection("teams")
      .doc(board.name)
      .set(board);
  };

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      name,
      emailid,
      password,
      phoneno,
      address,
      designation,
      experience
    } = this.state;

    this.ref
      .add({
        name,
        emailid,
        password,
        phoneno,
        address,
        designation,
        experience
      })
      .then((docRef) => {
        this.setState({
          name: '',
          emailid: '',
          password: '',
          phoneno: '',
          address: '',
          designation: '',
          experience: ''
        });
        this.props.history.push('/Dashboard');
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };
  

  onCollectionUpdate = (querySnapshot) => {
    const keys = [];
    querySnapshot.forEach((doc) => {
      const { name,emailid,password,phoneno,address,designation,experience } = doc.data();
      keys.push({
        key: doc.id,
        doc, // DocumentSnapshot
        name,
        emailid,
        password,
        phoneno,
        address,
        designation,
        experience,
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
           <center>KEY ROLES</center>   
            </h3>
          </div>
          <div class="panel-body">
          <h4><button type="submit" class="btn btn-primary  float-right" >Create Team</button></h4>
          <form onSubmit={this.onSubmit}>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email-ID</th>
                  {/* <th>Password</th>
                  <th>Phone Number</th>
                  <th>Address</th> */}
                  <th>Designation</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {this.state.keys.map(board =>
                  <tr>
                    <td><Link to={`/show/${board.key}`}>{board.name}</Link></td>
                    <td>{board.emailid}</td>
                    {/* <td>{board.password}</td>
                    <td>{board.phoneno}</td>
                    <td>{board.address}</td> */}
                    <td>{board.designation}</td>
                    <td>{board.experience}</td>
                    <td><input type="checkbox" onChange={()=>this.handleCheck(board)} defaultChecked={this.state.checked}/></td>
                    
                  </tr>
                )}
              </tbody>
            </table>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default Keyshow;