import React, {
    Component
} from "react";
import {
    render
} from "react-dom";
import firebase from "../../config/fbConfig"
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Times extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection("time");
        this.state = {
            lessValue: {},
            equalValue: {},
            moreValue: {},
            lessTotalValue: null,
            equalTotalValue: null,
            moreTotalValue: null,
            pertValue: "",
            stdDevValue: "",
            taskList: [],
            taskName: ''
        };
    }

    componentDidMount() {
        this.ref.get().then(result => {
            let resultData = [];
            let id;
            result.docs.forEach(data => {
                resultData.push(data.data());
                id = data.id
            })
            if (resultData.length > 0) {
                this.setState({ taskList: resultData[0].taskList, id, })
            }
        })
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
    };


    handleChange = id => e => {
        let valueName = '';
        switch (e.target.name) {
            case 'lessValue': {
                valueName = 'lessTotalValue'
            }
                break;
            case 'moreValue': {
                valueName = 'moreTotalValue'
            }
                break;
            case 'equalValue': {
                valueName = 'equalTotalValue'
            }
                break;
        }
        const values = { ...this.state[e.target.name] };
        values[id] = e.target.value;
        let totalValue;
        if (Object.values(values).length === this.state.taskList.length) {
            totalValue = Object.values(values).reduce((a, b) => { return Number(a) + Number(b) }, 0)
        }
        this.setState({ [e.target.name]: values, [valueName]: totalValue })
    };

    render() {
        const {
            lessTotalValue,
            equalTotalValue,
            moreTotalValue,
        } = this.state;
        const { superVisorAuthState } = this.props;
        let superVisorAuthL =
            JSON.parse(localStorage.getItem("superVisorAuth")) || [];
        if (!superVisorAuthState.length && !superVisorAuthL.length) {
            return <Redirect to="/signin" />;
        }
        return (<div>
            <div className="container" >
                <ToastContainer />
                <div className="row clearfix" >
                    <div className="col-md-12 column" >
                        <form onSubmit={e => e.preventDefault()}>
                            <table className="table table-bordered table-hover"
                                id="tab_logic" >
                                <thead >
                                    <tr>
                                        <th className="text-center" > TASKS </th>
                                        <th className="text-center" > Less </th>
                                        <th className="text-center" > EQUAL </th>
                                        <th className="text-center" > MORE </th> <th />
                                    </tr> </thead>
                                <tbody>
                                    {this.state.taskList.map((item, id) => (
                                        <tr id="addr0" key={id}>
                                            <td>
                                                <input type="text" name="taskName" disabled value={item.taskName} onChange={this.handleChange(id)} className="form-control" />
                                            </td>
                                            <td>
                                                <input type="number"
                                                    name="lessValue"
                                                    onChange={this.handleChange(item.id)
                                                    }
                                                    ref="lessValue"
                                                    className="form-control" />
                                            </td>
                                            <td>
                                                <input type="number"
                                                    name="equalValue"
                                                    onChange={
                                                        this.handleChange(item.id)
                                                    }
                                                    ref="equalValue"
                                                    className="form-control" />
                                            </td>
                                            <td >
                                                <input type="number"
                                                    name="moreValue"
                                                    onChange={
                                                        this.handleChange(item.id)
                                                    }
                                                    ref="moreValue"
                                                    className="form-control" />
                                            </td>
                                        </tr>)
                                    )
                                    }
                                    <tr>
                                        <th> <h5> Total </h5></th>
                                        <th > <input type="number"

                                            name="lessTotalValue"
                                            onChange={this.onChange}
                                            value={this.state.lessTotalValue}
                                            style={
                                                {
                                                    width: "200px",
                                                    height: "38px",
                                                    borderRadius: "10px"
                                                }
                                            }
                                            disabled
                                        /></th>
                                        <th> <input type="number"

                                            name="equalTotalValue"

                                            value={
                                                equalTotalValue
                                            }
                                            style={
                                                {
                                                    width: "200px",
                                                    height: "36px",
                                                    borderRadius: "10px"
                                                }
                                            }
                                            onChange={
                                                this.onChange
                                            } /></th>
                                        <th > <input type="number"

                                            name="moreTotalValue"
                                            value={moreTotalValue}
                                            style={{ width: "200px", height: "36px", borderRadius: "10px" }}
                                            onChange={this.onChange} /></th>
                                    </tr>
                                </tbody>
                            </table>

                            <button type="submit" onClick={() => {
                                let total = (this.state.lessTotalValue + 4 * this.state.equalTotalValue + this.state.moreTotalValue) / 6;
                                // console.log(total);
                                let std = (this.state.moreTotalValue - this.state.lessTotalValue) / 6;
                                //console.log(std);
                                this.ref = firebase.firestore().collection("duration");
                                // this.state = {
                                //     // userId: uid,
                                //     pertValue: total,
                                //     stdDevValue: std,
                                //     lessTotalValue:this.state.lessTotalValue,
                                //     equalTotalValue: this.state.equalTotalValue,
                                //     moreTotalValue: this.state.moreTotalValue,
                                // };
                                // onChange = (e) => {
                                //     const state = this.state;
                                //     state[e.target.name] = e.target.value;
                                //     this.setState(state);
                                // };

                                const {
                                    //  userId,
                                    pertValue,
                                    stdDevValue,
                                    lessTotalValue,
                                    equalTotalValue,
                                    moreTotalValue,
                                } = this.state;

                                this.ref.add({
                                    userId: superVisorAuthL[0].id,
                                    pertValue: total,
                                    stdDevValue: std,
                                    lessTotalValue,
                                    equalTotalValue,
                                    moreTotalValue,
                                })
                                    .then((docRef) => {
                                        this.props.history.push("/superVisor");
                                    })
                                    .catch((error) => {
                                        console.error("Error adding document: ", error);
                                    });


                                // this.ref().add({
                                //     userId: id,
                                //     pertValue: total,
                                //     stdDevValue: std,
                                //     lessTotalValue: "",
                                //     equalTotalValue: "",
                                //     moreTotalValue: "",

                                // })
                            }} className="btn btn-info" style={{ margin: "10px 50px" }}> Save </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
const mapStateToProps = (state) => ({
    superVisorAuthState: state.auth.superVisorAuth,
});

export default compose(
    connect(mapStateToProps),
)(Times);
// .add({
//     userId: id,
//     pertValue: total
// })