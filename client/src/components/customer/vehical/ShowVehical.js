import React from 'react'
import {connect} from 'react-redux'

function ShowVehical(props){
    return(
        <div>
            <h1>Vehical Details</h1>
            <br></br>
            {
                props.vehical && (
                    <div>
                        <h2>{props.vehical.vehicalNumber}</h2>
                        <h2>{props.vehical.vehicalType}</h2>
                    </div>
                )
            }
        </div>
    )
}

const mapStatetoProps = (state, props) => {
    return {
        vehical : state.vehicals.find(vehical => vehical._id == props.match.params.vehical)
    }
}

export default connect(mapStatetoProps)(ShowVehical)