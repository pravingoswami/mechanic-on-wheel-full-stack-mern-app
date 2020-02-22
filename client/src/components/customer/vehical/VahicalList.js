import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { StartRemoveVehical } from '../../../actions/vehicalsAction'

function VahicalList(props){

    const handleRemoveVehical = (id) => {
        props.dispatch(StartRemoveVehical(id))
    }

    return(
        <div>
            <h2>Totol Register Vehicals - {props.vehicals && props.vehicals.length}</h2>
            <ol>
                {
                    props.vehicals && props.vehicals.map(vehical => <li key = {vehical._id}>{vehical.vehicalNumber} &nbsp;&nbsp;<button><Link to = {`/vehicals/show/${vehical._id}`} >View Detail</Link></button> &nbsp; &nbsp;<button onClick = {() => handleRemoveVehical(vehical._id)} >Rmove</button></li>)
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