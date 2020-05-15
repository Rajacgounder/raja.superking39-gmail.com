import React,{Component} from "react";
import { render } from "react-dom";
import firebase from "../../config/fbConfig"

class Times extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("time");
    this.state = {
      less: "",
      week: "",
      more: "",
      pert:"",
      
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
      pert,
      
    } = this.state;
    this.ref
      .add({
        less,
        more,
        week,
        pert,
      })
      .then((docRef) => {
        this.setState({
            less: "",
            week: "",
            more: "",
            pert:"",
        });
        this.props.history.push("/superVisor");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  state = {
    rows: [{}]
  };
  handleChange = idx => e => {
    const { name, value } = e.target;
    const rows = [...this.state.rows];
    rows[idx] = {
      [name]: value
    };
    this.setState({
      rows
    });
  };
  handleAddRow = () => {
    const item = {
      task: "",
      less: "",
      equal: "",
      more: ""
    };
    this.setState({
      rows: [...this.state.rows, item]
    });
  };
  handlesave = () =>{
    
  }
  handleRemoveRow = () => {
    this.setState({
      rows: this.state.rows.slice(0, -1)
    });
  };
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }
  render() {
    const{
      less,
      more,
      week,
  }=this.state;
    return (
      <div>
        <div className="container">
          <div className="row clearfix">
            <div className="col-md-12 column">
            <form onSubmit={this.onSubmit}>
              <table
                className="table table-bordered table-hover"
                id="tab_logic"
              >
                <thead>
                  <tr>
                    {/* <th className="text-center"> # </th> */}
                    <th className="text-center">TASKS</th>
                    <th className="text-center"> Less </th>
                    <th className="text-center"> EQUAL </th>
                    <th className="text-center"> MORE </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.rows.map((item, idx) => (
                    <tr id="addr0" key={idx}>
                      {/* <td>{idx}</td> */}
                      <td>
                        <input
                          type="text"
                          name="task"
                          value={this.state.rows[idx].task}
                          onChange={this.handleChange(idx)}
                          className="form-control" 
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="less"
                          //value={this.state.rows[idx].less}
                          onChange={this.handleChange(idx)}
                          ref="less"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="equal"
                          //value={this.state.rows[idx].equal}
                          onChange={this.handleChange(idx)}
                          ref="equal"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="more"
                          // value={this.state.rows[idx].more}
                          onChange={this.handleChange(idx)}
                          ref="more"
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={this.handleRemoveSpecificRow(idx)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                        <th><h5>Total</h5></th>
                        <th><input type="number" min="4" name="less" value={less} style={{width: "200px",height:"38px",borderRadius:"10px"}} onChange={this.onChange}/></th>
                        <th><input type="number" min="4" name="week" value={week} style={{width: "200px",height:"36px",borderRadius:"10px"}} onChange={this.onChange}/></th>
                        <th><input type="number" min="4" name="more" value={more} style={{width: "200px",height:"36px",borderRadius:"10px"}} onChange={this.onChange}/></th>
                    </tr>
                </tbody>
              </table>
              </form>
              <button onClick={this.handleAddRow} className="btn btn-primary">
                Add NEW TASK
              </button>
              <button type="submit" className="btn btn-info" style={{margin:"10px 50px"}} >Save</button>
              <button
                onClick={this.handleRemoveRow}
                className="btn btn-danger float-right">
                Delete Last TASK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Times;