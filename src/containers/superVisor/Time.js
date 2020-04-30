import React, {Component} from "react";
import firebase from "../../config/fbConfig";

class Time extends Component{
//     state = { value: 0 };
//   handleChange = event => {
//     let { value, min, max } = event.target;
//     value = Math.max(Number(min), Math.min(Number(max), Number(value)));
//     this.setState({ value });
//   };

constructor() {
    super();
    this.ref = firebase.firestore().collection("time");
    this.state = {
      less: "",
      week: "",
      more: "",
      
    };
  }
  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      less,
      more,
      week,
      
    } = this.state;

    this.ref
      .add({
        less,
        more,
        week,
      })
      .then((docRef) => {
        this.setState({
            less: "",
            week: "",
            more: "",
        });
        this.props.history.push("/superVisor");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };


    render(){
        const{
            less,
            more,
            week,
        }=this.state;
        return(
            <div className="calculation">
            <form onSubmit={this.onSubmit}>
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
                        <th><input type="number"  min="1" max="5" style={{width: "200px"}} required/></th>
                        <th><input type="number" min="4" required/></th>
                        <th><input type="number" min="4" required></input></th>
                    </tr>
                    <tr>
                        <th>1.2</th>
                        <th><input type="number" min="4" required/></th>
                        <th><input type="number" min="4" required></input></th>
                        <th><input type="number" min="4" required/></th>
                    </tr>
                    <tr>
                        <th>2</th>
                        <th><input type="number" min="4" required/></th>
                        <th><input type="number" min="4" required/></th>
                        <th><input type="number" min="4" required/></th>
                    </tr>
                    <tr>
                        <th>2.1</th>
                        <th><input type="number" min="4" required/></th>
                        <th><input type="number" min="4" required/></th>
                        <th><input type="number" min="4" required/></th>
                    </tr>
                    <tr>
                        <th>3</th>
                        <th><input type="number" min="4" required/></th>
                        <th><input type="number" min="4" required /></th>
                        <th><input type="number" min="4" required/></th>
                    </tr>
                    <tr>
                        <th>3.1</th>
                        <th><input type="number" min="4" /></th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                    </tr>
                    <tr>
                        <th>4</th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                    </tr>
                    <tr>
                        <th>5</th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                    </tr>
                    <tr>
                        <th>6</th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                    </tr>
                    <tr>
                        <th>7</th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                        <th><input type="number" min="4"/></th>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <th><input type="number" min="4" name="less" value={less} onChange={this.onChange}/></th>
                        <th><input type="number" min="4" name="week" value={week} onChange={this.onChange}/></th>
                        <th><input type="number" min="4" name="more" value={more} onChange={this.onChange}/></th>
                    </tr>
                </tbody>
            </table>
            <div>
            <center>
            <button type="submit" class="btn btn-primary"  >Submit</button>
            <button type="reset" class="btn btn-danger" >Clear</button>
            </center>
            </div>
            </form>
            </div>
        )
    }
}

export default Time;