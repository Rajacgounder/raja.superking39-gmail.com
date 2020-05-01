import React,{Component} from 'react'


class ViewTeam extends Component{
    render(){
        return(
            <div className="team">
            <h4><center>View Teams</center></h4>
            <button class="btn btn-primary">Send Consent</button>
            <table style={{border: "5px solid"}}>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>emailId</th>
                        <th>Designation</th>
                        <th>Experience</th>
                        <th>Consent</th>
                    </tr>
                    <tr>
                    
                        <th>Ram</th>
                        <th>ram@gmail.com</th>
                        <th>Designer</th>
                        <th>4</th>
                        <th rowSpan="4"><button class="btn btn-primary">Send Consent</button></th>
                    </tr>
                    <tr>
                        <th>Arya</th>
                        <th>Arya@gmail.com</th>
                        <th>Developer</th>
                        <th>3</th>
                    </tr>
                    <tr>
                        <th>Raja</th>
                        <th>raja@gmail.com</th>
                        <th>HR</th>
                        <th>1</th>
                    </tr>
            </tbody>
            </table>
            </div>
        )
    }
}

export default ViewTeam;