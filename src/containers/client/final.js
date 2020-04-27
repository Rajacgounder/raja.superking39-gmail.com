import React, { Component } from "react";
import './finalstyle.css';



class Request extends Component{
    render(){
        return(
            <center>
            <div class="container pt-4">
                <button type="submit" id="one" class="btn btn-danger">Rejected</button>
                <button type="submit" id="two" class="btn btn-primary">Not Clear</button>
                <button type="submit" id="three" class="btn btn-success">Accepted</button>
            </div>
            </center>
        )
    }
}
export default (Request);