import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

function ProfileShow(props){
    return(
        <div>{console.log(props.user)}
            {props.user && (
                <div>
                    <h1>{props.user.serviceType && props.user.serviceType}</h1>
                    <h2>Profile</h2>
                    {
                        props.user.avatar && <img src = {`http://localhost:3017/${props.user.avatar}`} style = {{height : "50vh"}} />
                    }
                    <h1> <strong>Name</strong> : {props.user.name}</h1>
                    <h1>  <strong>Username</strong> :  {props.user.username}</h1>
                    <h1>  <strong>Email</strong> :  {props.user.email}</h1>
                    <h1>  <strong>Mobile</strong> :  {props.user.mobile}</h1>
                    <h1>  <strong>Gender</strong> :  {props.user.gender}</h1>
                    <h2>Lisence Image</h2>

                    <img src = {`http://localhost:3017/${props.user.lisenceImage}`} style = {{height : "30vh"}} />
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