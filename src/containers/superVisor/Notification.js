import React,{Component} from "react"
import { Link } from 'react-router-dom';
import firebase from "../../config/fbConfig"

class Notification extends Component{
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('final');
    this.unsubscribe = null;
    this.state = {
      keys: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const keys = [];
    querySnapshot.forEach((doc) => {
      const { message,reason } = doc.data();
      keys.push({
        key: doc.id,
        doc, // DocumentSnapshot
        message,
        reason,
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
           <center>Notification</center>   
            </h3>
          </div>
          <div class="panel-body">
            <table class="table table-stripe">
              <tbody>
                {this.state.keys.map(board =>
                  <tr>
                  <td>{board.reason}</td>
                 <td>{board.message}</td>
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


export default Notification;