import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';



class ViewTeam extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('duration');
        this.unsubscribe = null;
        this.state = {
            keys: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const keys = [];
        querySnapshot.forEach((doc) => {
            const { pertValue, stdDevValue, lessTotalValue, equalTotalValue, moreTotalValue } = doc.data();
            keys.push({
                key: doc.id,
                doc, // DocumentSnapshot
                pertValue,
                stdDevValue,
                lessTotalValue,
                equalTotalValue,
                moreTotalValue,
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
                            <center>Duration</center>
                        </h3>
                    </div>
                    <div class="panel-body">
                        <table class="table table-stripe">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Optimistic Time Estimate</th>
                                    <th>Most Likely Time Estimate</th>
                                    <th>Pessimistic Time Estimate</th>
                                    <th>PERT Value</th>
                                    <th>Standard Deviation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.keys.map(duration =>
                                    <tr>
                                        <td>{duration.lessTotalValue}</td>
                                        <td>{duration.equalTotalValue}</td>
                                        <td>{duration.moreTotalValue}</td><br></br>
                                        <td>{duration.pertValue}</td>
                                        <td>{duration.stdDevValue}</td>
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


export default ViewTeam;