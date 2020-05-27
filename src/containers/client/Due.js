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
        let avgPertValue, avgStdValue = null;
        const pertValues = []; const stdValues = [];
        if (this.state.keys.length) {
            this.state.keys.forEach(key => {
                pertValues.push(key.pertValue);
                stdValues.push(key.stdDevValue)
            })
            avgPertValue = pertValues.reduce((a, b) => a + b);
            avgStdValue = stdValues.reduce((c, d) => c + d);
        }
        let weeks = (this.state.avgPertValue / 7);
        console.log(weeks);

        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <p>  <h3 class="panel-title">
                            <center>Duration</center><br />
                        </h3></p>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <div>
                            <p><center>Total Days to complete Project - {Math.round(avgPertValue)}</center></p><br />
                            <p><center>Average STD Value - {Math.round(avgStdValue)}</center></p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ViewTeam;