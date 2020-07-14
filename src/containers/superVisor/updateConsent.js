import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';


class UpdateConsent extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('projects');
        this.unsubscribe = null;
        this.state = {
            keys: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const keys = [];
        querySnapshot.forEach((doc) => {
            const { content } = doc.data();
            keys.push({
                key: doc.id,
                doc, // DocumentSnapshot
                content,
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
                        <h4><Link to="/CreateSupervisor" class="btn btn-primary">Add Key Roles</Link></h4>
                        {/* <h4><button type="submit" class="btn btn-primary  float-right" >Create Team</button></h4> */}
                        <form onSubmit={this.onSubmit}>
                            <table class="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>Content</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.keys.map(board =>
                                        <tr>
                                            <td><Link to={`/rule/${board.key}`}>{board.content}</Link></td>
                                            {/* <td><input type="checkbox" onChange={()=>this.handleCheck(board)} defaultChecked={this.state.checked}/></td> */}

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


export default UpdateConsent;