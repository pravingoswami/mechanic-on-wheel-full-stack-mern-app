import React from 'react'
import { Button, Label, Input, Container } from 'reactstrap'
import { connect } from 'react-redux'
import { startAddVehical } from '../../../actions/vehicalsAction'

class NewVehical extends React.Component{

    constructor(){
        super()
        this.state = {
            vehicalNumber : '',
            vehicaltype : '',
            vehical : ['2 Wheeler', '4 Wheeler', '3 Wheeler']
        }
    }


    handleForm = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    handleVehical = (e) => {
        this.setState({
            vehicaltype : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            vehicalNumber : this.state.vehicalNumber,
            vehicalType : this.state.vehicaltype
        }
        const redirect = () => this.props.history.push('/vehicals')
        console.log(formData)
        this.props.dispatch(startAddVehical(formData, redirect))

    }

    render(){
        return(
            <Container>
                <h1>ADD New Vehical</h1>

                <br></br>
                <Label for="vehicalNumber">Vehical Number</Label>
                <Input type="text" name="vehicalNumber" id="vehicalNumber" placeholder="Enter your vehical Number"value = {this.state.vehicalNumber}  onChange = {this.handleForm} />

                <br></br>
                <br></br>
                <Label for="vehicalType">Select Vehical Type</Label>
                    <Input type="select" name="select" id="vehicalType" onChange = {this.handleVehical} >
                        <option>select</option>
                    {
                        this.state.vehical.map((vehical, i) => {
                            return (
                            <option key = {i} value = {vehical} >{vehical}</option>
                            )
                        })
                    }
                    </Input>
                <br></br>
                <br></br>
                <Button color = "primary" onClick = {this.handleSubmit} >SUBMIT</Button>
            </Container>
        )
    }
}

export default connect()(NewVehical)