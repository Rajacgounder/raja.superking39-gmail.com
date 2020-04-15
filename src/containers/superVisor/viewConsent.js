import React ,{Component} from 'react'
import {getFirebase, getFirestore} from './'

class Viewconsent extends Component{
    state={
        projects:null
    }
    componentDidMount(){
        console.log('mounted')
        db.collection('projects')
    }
    render(){
        return(
            <div className="Con">
                <h1><center>Consent Form</center></h1>

            </div>
        )
    }
}