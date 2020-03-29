import React, { Component } from "react";
import './finalstyle.css';

class Request extends React.Component{
    render(){
        return(
            <center>
            <div class="container pt-4">
                <button type="submit" class="btn btn-danger">Rejected</button>&nbsp
                <button type="submit" class="btn btn-primary">Not Clear</button>
                <button type="submit" class="btn btn-success">Accepted</button>
            </div>
            </center>
        )
    }
}
export default (Request);