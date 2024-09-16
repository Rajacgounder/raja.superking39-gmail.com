import React, { Component } from 'react';
import firebase from '../../config/fbConfig';
import { Link } from 'react-router-dom';

class ProjectShow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            board: {},

            key: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('projects').doc(this.props.match.params.id);
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

    delete(id) {
        firebase.firestore().collection('projects').doc(id).delete().then(() => {
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
                        <h4><Link to="/CreateProject">Consent</Link></h4><br />
                        <h3 class="panel-title">
                            {this.state.board.content}
                        </h3>
                        <br />
                        <Link to={`/ruleedit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectShow;
