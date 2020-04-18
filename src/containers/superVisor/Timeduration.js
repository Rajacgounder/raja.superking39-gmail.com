import React, {Component} from "react";
import './roles.css'

class Duration extends Component{
    render(){
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
                        <th>1.1</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.2</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.3</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.4</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.5</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.6</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.7</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.8</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.9</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                    <tr>
                        <th>1.10</th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                        <th><input type="checkbox" class="form-check-input" id="exampleCheck1"></input></th>
                    </tr>
                </tbody>
            </table>
            <div>
            <center>
            <button type="submit" class="btn btn-primary" id="hello">Submit</button>
            <button type="reset" class="btn btn-danger" id="hello">Clear</button>
            </center>
            </div>
        </div>
        )
    }
}
export default (Duration);
