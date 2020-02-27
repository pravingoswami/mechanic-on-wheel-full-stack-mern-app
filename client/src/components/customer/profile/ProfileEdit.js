import React from 'react'
import {connect} from 'react-redux'

class ProfileEdit extends React.Component{

    render(){
        return(
            <div>
                <h1>Edit Profile</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(ProfileEdit)