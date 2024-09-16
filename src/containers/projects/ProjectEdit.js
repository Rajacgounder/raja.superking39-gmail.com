import React, { Component } from 'react';
import firebase from '../../config/fbConfig';
import { Link } from 'react-router-dom';

class ClientEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            content: '',
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('projects').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const board = doc.data();
                this.setState({
                    key: doc.id,
                    content: board.content

                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ board: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { content } = this.state;

        const updateRef = firebase.firestore().collection('projects').doc(this.state.key);
        updateRef.set({
            content
        }).then((docRef) => {
            this.setState({
                key: '',
                content: ''
            });
            this.props.history.push("/rule/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <center>Edit Consent</center>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/rule/${this.state.key}`} class="btn btn-primary">Consent</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <div className="form-group">
                                    <label htmlFor="content">Rules</label>
                                    <textarea
                                        className="form-control"
                                        id="content"
                                        name="content"
                                        onChange={this.onChange}
                                        value={this.state.content}
                                        placeholder="Rules"
                                        required />
                                </div>
                                <button type="submit" class="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClientEdit;
