import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/fbConfig';



class ViewTeam extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('duration');
        this.unsubscribe = null;
        this.state = {
            keys: [],
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const keys = [];
        querySnapshot.forEach((doc) => {
            const { pertValue, stdDevValue, lessTotalValue, equalTotalValue, moreTotalValue, userId } = doc.data();
            firebase.firestore().collection('super_visors').doc(userId).get().then(res => {
                keys.push({
                    key: doc.id,
                    userId: userId,
                    pertValue,
                    stdDevValue,
                    lessTotalValue,
                    equalTotalValue,
                    moreTotalValue,
                    userName: res.data().name,
                    designation: res.data().designation
                });
                this.setState({ keys });

                // firebase.firestore().collection('super_visors').doc(key).set({ doShowConsentForm: true })
            })
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        let avgPertValue, week, avgStdValue = null;
        const pertValues = []; const stdValues = [];
        if (this.state.keys.length) {
            this.state.keys.forEach(key => {
                pertValues.push(key.pertValue);
                stdValues.push(key.stdDevValue)
            })
            avgPertValue = pertValues.reduce((a, b) => a + b) / this.state.keys.length;
            avgStdValue = stdValues.reduce((c, d) => c + d) / this.state.keys.length;
        }
        week = avgPertValue / 7;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            <center>Duration</center>
                        </h3>
                        <p><center>Average Pert Value -{Math.round(avgPertValue)}</center></p>
                        <p><center>Total number of weeks-{Math.round(week)}</center></p>
                        <p><center>Average STD Value -{(Math.round(avgStdValue))}</center></p>
                    </div>
                    <div class="panel-body">
                        <table class="table table-stripe">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Designation</th>
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
                                        <td>{duration.userName}</td>
                                        <td>{duration.designation}</td>
                                        <td>{duration.lessTotalValue}</td>
                                        <td>{duration.equalTotalValue}</td>
                                        <td>{duration.moreTotalValue}</td>
                                        <td>{duration.pertValue}</td>
                                        <td>{duration.stdDevValue}</td>
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