import React, {Component} from 'react'
import { connect } from 'react-redux';
import { getConsents } from "../../store/actions/consentAction";

class Premission extends  Component{
    componentDidMount() {
        this.props.getConsents();
    }
    render(){
        const { consents } = this.props;
        return(
            <div>
                <h1><center>Consent Form</center></h1>
                {consents.length > 0 ? consents.map(consent => {
                    return (
                        <p>{consent.content}</p> 
                    )
                }): <p>Loading...</p>}
                <center>
               
                <form>
                <input type="checkbox" name="vehicle1" value="Bike"/>
                <label for="vehicle1"> I accepted the terms and condition of the consent</label><br></br>
                <input type="checkbox" name="vehicle2" value="Car"/>
                <label for="vehicle2"> I donot accept the terms and the conditions of the consent</label><br></br>
                <button type="submit" class="btn btn-primary" >Submit</button>
                </form>
                </center>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getConsents: () => {
            dispatch(getConsents())
        }
    }
}

const mapStateToProps = state => {
    return {
        consents: state.project.projects
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Premission)