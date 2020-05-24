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

class Times extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("time");
    this.state = {
      lessTotalValue: "",
      equalTotalValue: "",
      moreTotalValue: "",
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
        this.setState({ taskList: resultData[0].taskList, id, taskListClone: resultData[0].taskList })
      }
    })
  }

  onChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    // this.setState(state);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      lessTotalValue,
      equalTotalValue,
      moreTotalValue,
      pertValue,
      stdDevValue,
      taskList,
    } = this.state;
    this.ref
      .add({
        lessTotalValue,
        equalTotalValue,
        moreTotalValue,
        pertValue,
        stdDevValue,
        taskList,
      })
      .then((docRef) => {
        this.setState({
          lessTotalValue: "",
          equalTotalValue: "",
          moreTotalValue: "",
          pertValue: "",
          stdDevValue: "",
          taskList: [],
        });
        toast.success('Tasks added successfully!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // this.props.history.push("/superVisor");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error('Something went wrong!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  onUpdate = () => {
    this.ref.doc(this.state.id).set({ taskList: this.state.taskList }, { merge: true }).then(() => {
      toast.success('Tasks Updated successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }).catch(err => {
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }

  handleChange = id => e => {
    const {
      name,
      value
    } = e.target;
    this.setState({ taskName: e.target.value })
  };

  handleAddRow = () => {
    const task = {
      taskName: this.state.taskName,
      id: uuidv4()
    };
    const taskListClone = [...this.state.taskList];
    taskListClone.push(task)
    this.setState({
      taskList: [...taskListClone],
      taskName: ''
    });
  };

  handleRemoveSpecificRow = (id) => () => {
    const taskListClone = [...this.state.taskList]
    const updatedTaskList = taskListClone.filter(task => {
      return task.id !== id
    })
    this.setState({
      taskList: updatedTaskList,
      isChanged: true
    })
  }

  render() {
    const {
      lessTotalValue,
      equalTotalValue,
      moreTotalValue,
    } = this.state;
    const isChanged = () => {
      this.state.taskListClone.forEach(task => {
        let taskId = task.id;
        let count = 0;
        this.state.taskList.forEach(taskClone => {
          if (taskClone.id === taskId) {
            count++;
          }
        });
        if (count === 0 || this.state.taskListClone.length !== this.state.taskList.length) {
          return true;
        }
      });
      if (!this.state.isChanged) {
        return true;
      }
    }
    return (
      <div>
        <div className="container" >
          <ToastContainer />
          <div className="row clearfix" >
            <div className="col-md-12 column" >
              <form onSubmit={e => e.preventDefault()} >
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
                    <>
                      <tr id="addr0" key={1}>
                        <td>
                          <input type="text" name="taskName" value={this.state.taskName} onChange={this.handleChange()} className="form-control" />
                        </td>
                        <td>
                          <input type="number"
                            name="lessTotalValue"
                            disabled={true}
                            // value={this.state.rows[idx].less}
                            onChange={this.handleChange()
                            }
                            ref="lessTotalValue"
                            className="form-control" />
                        </td>
                        <td>
                          <input type="number"
                            name="equalTotalValue"
                            disabled={true}
                            //value={this.state.rows[idx].equal}
                            onChange={
                              this.handleChange()
                            }
                            ref="equalTotalValue"
                            className="form-control" />
                        </td>
                        <td >
                          <input type="number"
                            name="moreTotalValue"
                            disabled={true}
                            // value={this.state.rows[idx].more}
                            onChange={
                              this.handleChange()
                            }
                            ref="moreTotalValue"
                            className="form-control" />
                        </td>
                        {/* <td>
                        <button className="btn btn-outline-danger btn-sm" onClick={this.handleRemoveSpecificRow()}>Remove </button>
                      </td> */}
                      </tr>
                    </>
                    {this.state.taskList.map((item, id) => (
                      <tr id="addr0" key={id}>
                        <td>
                          <input type="text" name="taskName" value={item.taskName} onChange={this.handleChange(id)} className="form-control" />
                        </td>
                        <td>
                          <input type="number"
                            name="lessTotalValue"
                            disabled={true}
                            //value={this.state.rows[idx].less}
                            onChange={this.handleChange(id)
                            }
                            ref="lessTotalValue"
                            className="form-control" />
                        </td>
                        <td>
                          <input type="number"
                            name="equalTotalValue"
                            disabled={true}
                            //value={this.state.rows[idx].equal}
                            onChange={
                              this.handleChange(id)
                            }
                            ref="equalTotalValue"
                            className="form-control" />
                        </td>
                        <td >
                          <input type="number"
                            name="moreTotalValue"
                            disabled={true}
                            // value={this.state.rows[idx].more}
                            onChange={
                              this.handleChange(id)
                            }
                            ref="moreTotalValue"
                            className="form-control" />
                        </td>
                        <td>
                          <button className="btn btn-outline-danger btn-sm" onClick={this.handleRemoveSpecificRow(item.id)}>Remove </button>
                        </td>
                      </tr>)
                    )
                    }
                    <tr>
                      <th> <h5> Total </h5></th>
                      <th > <input type="number"
                        min="4"
                        name="lessTotalValue"
                        value={
                          lessTotalValue
                        }
                        disabled={true}
                        style={
                          {
                            width: "200px",
                            height: "38px",
                            borderRadius: "10px"
                          }
                        }
                        onChange={
                          this.onChange
                        }
                      /></th>
                      <th> <input type="number"
                        min="4"
                        name="equalTotalValue"
                        disabled={true}
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
                        min="4"
                        name="moreTotalValue"
                        disabled={true}
                        value={moreTotalValue}
                        style={{
                          width: "200px",
                          height: "36px",
                          borderRadius: "10px"
                        }
                        }
                        onChange={this.onChange} /></th>
                    </tr>
                  </tbody>
                </table>

                {!this.state.id && <button type="submit" onClick={this.onSubmit} className="btn btn-info" style={{ margin: "10px 50px" }}>Save</button>}
                {this.state.id && <button type="submit" disabled={isChanged()} onClick={this.onUpdate} className="btn btn-primary  float-right" style={{ margin: "10px 50px" }}>Update</button>}

              </form> <button onClick={this.handleAddRow} className="btn btn-primary" >Add TASK </button>
              {/* <button onClick={this.handleRemoveRow} className="btn btn-danger float-right" >Delete Last TASK </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Times;