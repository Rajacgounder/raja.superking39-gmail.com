import React , {Component} from 'react';

class Roles extends Component{
    render(){
        return(
        <div className="not">
            <select id="dropdown">
                <option>Hello</option>
                <option>Dude</option>
            </select>
            <input type="number" min="1" max="5"></input>
        </div>
        )
    }
}
export default Roles;