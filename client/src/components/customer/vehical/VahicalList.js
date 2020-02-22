import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

function VahicalList(props){
    return(
        <div>
            <h2>Totol Register Vehicals - {props.vehicals && props.vehicals.length}</h2>
            <ol>
                {
                    props.vehicals && props.vehicals.map(vehical => <li key = {vehical._id}>{vehical.vehicalNumber} &nbsp;&nbsp;<button><Link to = {`/vehicals/show/:vehical`} >View Detail</Link></button> </li>)
                }
            </ol>
            <br></br>
            <br></br>
            <br></br>
            <h2><Link to = "/vehicals/add-vehicals" >ADD Vehicals</Link></h2>
        </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        vehicals : state.vehicals
    }
}

export default connect(mapStatetoProps)(VahicalList)