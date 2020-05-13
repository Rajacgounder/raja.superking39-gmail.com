import React, {Component} from "react";
import './roles.css'
import firebase from '../../config/fbConfig';


class Duration extends Component{

    state = {
        totalValue: 0,
        duration: {},
    }

    constructor(){
        super();
        this.ref =firebase.firestore.Collection("timeduration");
       this.state = {
            totalValue: 0,
            duration: {},
            
        };
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
      };
    
      onSubmit = (e) => {
        e.preventDefault();
        const {totalValue,duration} =this.state;

        this.ref.add({
            totalValue,
            duration,
        })
        .then((docRef) => {
            this.setState({
                totalValue: 0,
                duration: {},
            });
            this.props.history.push("/superVisor")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    };


    // constructor(props) {
    //     super(props);
    //     this.ref = firebase.firestore().collection('time_duration');
    //     this.unsubscribe = null;
    //     this.state = {
    //       keys: [],
    //       sdlc1:[4,7,14],
    //       sdlc2:[],
    //       sdlc3:[],
    //       sdlc4:[],
    //       sdlc5:[],
    //       sdlc6:[],
    //       sdlc7:[],
    //       sdlc8:[],
    //       sdlc9:[],
    //       sdlc10:[],

    //     };
    //   }

    //   onChange = (e) => {
    //     const state = this.state
    //     state[e.target.name] = e.target.value;
    //     this.setState(state);
    //   }

    //   onSubmit = (e) => {
    //     e.preventDefault();

    //     const{sdlc1,sdlc2,sdlc3,sdlc4,sdlc5,sdlc6,sdlc7,sdlc8,sdlc9,sdlc10} = this.state;

    //     this.ref.add(
    //         {
    //       sdlc1,
    //       sdlc2,
    //       sdlc3,
    //       sdlc4,
    //       sdlc5,
    //       sdlc6,
    //       sdlc7,
    //       sdlc8,
    //       sdlc9,
    //       sdlc10, 
    //         } ).then((docRef)) => {
    //         this.state({
    //             keys: [],
    //             sdlc1:[4,7,14],
    //             sdlc2:[],
    //             sdlc3:[],
    //             sdlc4:[],
    //             sdlc5:[],
    //             sdlc6:[],
    //             sdlc7:[],
    //             sdlc8:[],
    //             sdlc9:[],
    //             sdlc10:[],  
    //         });
    //         this.props.history.push("/")
    //     })
    //     .catch((error) => {
    //         console.error("Error adding document: ", error);
    //       });
    //     }


    handleChange = ({ type, value }) => {
        const updatedDuration = {...this.state.duration};
        updatedDuration[type] = value;
        this.setState({ duration: updatedDuration });
        // this.setState(prevState => ({
        //     totalValue: prevState.totalValue + value,
        // }))
    }

    handleSubmit = () => {
        console.log("Duration Value----->", this.state.duration);
        const totalValue = Object.values(this.state.duration).reduce((a, b) => a + b);
        console.log("Total Value ---->", totalValue)
    }


    render(){
        const{
            
                totalValue,
                duration,
        }= this.state;
        return(
        <div className="box">
            <table>
                <tbody>
                    <tr>
                        <th>Description</th>
                        <th>less than a Week</th>
                        <th>With in a Week</th>
                        <th>More Than Week</th>
                    </tr>
                    <tr>
                        <th><label for="sdlc1">People & At Risk Behaviours: </label><br></br></th>
                        <th><input type="radio"  name="sdlc1" value="4" onChange={() => this.handleChange({ type: '1.1', value: 4 })} /></th>
                        <th><input type="radio"  name="sdlc1" value="7" onChange={() => this.handleChange({ type: '1.1', value: 7 })} /></th>
                        <th><input type="radio"  name="sdlc1" value="14" onChange={() => this.handleChange({ type: '1.1', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>1.2</th>
                        <th><input type="radio"  name="sdlc2" value="4"  onChange={() => this.handleChange({ type: '1.2', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc2" value="7"  onChange={() => this.handleChange({ type: '1.2', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc2" value="14" onChange={() => this.handleChange({ type: '1.2', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th><input type="radio"  name="sdlc3" value="4" onChange={() => this.handleChange({ type: '2', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc3" value="7" onChange={() => this.handleChange({ type: '2', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc3" value="14" onChange={() => this.handleChange({ type: '2', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>2.1</th>
                        <th><input type="radio"  name="sdlc4" value="4" onChange={() => this.handleChange({ type: '2.1', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc4" value="7" onChange={() => this.handleChange({ type: '2.1', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc4" value="14" onChange={() => this.handleChange({ type: '2.1', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th><input type="radio"  name="sdlc5" value="4" onChange={() => this.handleChange({ type: '3', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc5" value="7" onChange={() => this.handleChange({ type: '3', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc5" value="14" onChange={() => this.handleChange({ type: '3', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>3.1</th>
                        <th><input type="radio"  name="sdlc6" value="4" onChange={() => this.handleChange({ type: '3.1', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc6" value="7" onChange={() => this.handleChange({ type: '3.1', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc6" value="14" onChange={() => this.handleChange({ type: '3.1', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>4</th>
                        <th><input type="radio"  name="sdlc7" value="4" onChange={() => this.handleChange({ type: '4', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc7" value="7" onChange={() => this.handleChange({ type: '4', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc7" value="14" onChange={() => this.handleChange({ type: '4', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>5</th>
                        <th><input type="radio"  name="sdlc8" value="4" onChange={() => this.handleChange({ type: '5', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc8" value="7" onChange={() => this.handleChange({ type: '5', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc8" value="14" onChange={() => this.handleChange({ type: '5', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>6</th>
                        <th><input type="radio"  name="sdlc9" value="4" onChange={() => this.handleChange({ type: '6', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc9" value="7" onChange={() => this.handleChange({ type: '6', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc9" value="14" onChange={() => this.handleChange({ type: '6', value: 14 })}></input></th>
                    </tr>
                    <tr>
                        <th>7</th>
                        <th><input type="radio"  name="sdlc10" value="4" onChange={() => this.handleChange({ type: '7', value: 4 })}></input></th>
                        <th><input type="radio"  name="sdlc10" value="7" onChange={() => this.handleChange({ type: '7', value: 7 })}></input></th>
                        <th><input type="radio"  name="sdlc10" value="14" onChange={() => this.handleChange({ type: '7', value: 14 })}></input></th>
                    </tr>
                </tbody>
            </table>
            <div>
            <center>
            <button type="submit" class="btn btn-primary" id="hello" onClick={this.handleSubmit}>Submit</button>
            <button type="reset" class="btn btn-danger" id="hello">Clear</button>
            </center>
            </div>
        </div>
        )
    }
}
export default (Duration);
