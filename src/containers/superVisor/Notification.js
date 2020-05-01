import React,{Component} from "react"
import { Link } from 'react-router-dom';
import firebase from "../../config/fbConfig"

class Notification extends Component{
    constructor(props) {
        super(props);
        this.state = {
          board: {},
          key: ''
        };
      }
    
      componentDidMount() {
        const ref = firebase.firestore().collection('final').doc(this.props.match.params.id);
        ref.get().then((doc) => {
          if (doc.exists) {
            this.setState({
              board: doc.data(),
              key: doc.id,
              isLoading: true
            });
          } else {
            console.log("No such document!");
          }
        });
      }
    render(){
        return(
            <div class="container">
            <dl>
            <dt>Notification</dt>
              <dd>{this.state.board.accepted}</dd>
            </dl>
            </div>
        )
    }
}

export default Notification;