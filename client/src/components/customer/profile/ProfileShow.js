import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

function ProfileShow(props){
    return(
        <div>{console.log(props.user)}
            {props.user && (
                <div>
                    <h1>{props.user.serviceType && props.user.serviceType}</h1>
                    <h1>{props.user.name}</h1>
                    <h1>{props.user.username}</h1>
                    <h1>{props.user.email}</h1>
                    <h1>{props.user.mobile}</h1>
                    <h1>{props.user.gender}</h1>
                </div>
            )}
            <h3><Link to = "/profile/edit" >Edit Profile</Link></h3>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(ProfileShow)