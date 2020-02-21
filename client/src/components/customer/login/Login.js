import React from 'react'

import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact'
import {Link} from 'react-router-dom'
import validator from 'validator'
import 'mdbreact/dist/css/mdb.css'
import { connect } from 'react-redux'
import { startLoginUser } from '../../../actions/usersActions'



const headerStyle = {
    textAlign : "center",
    color : "white"
    // margin : "50px 0 50px 0"
}
const imageStyle = {
backgroundImage: `url("https://cdn.pixabay.com/photo/2014/01/07/20/34/laptop-240192_960_720.jpg")`,
backgroundRepeat: 'no-repeat',
backgroundSize: 'cover',
backgroundPosition: 'center center',
height : "95vh"

}

class LoginPage extends React.Component{

    constructor(){
        super()
        this.state = {
            email : '',
            password : ''
        }
    }

    handleForm = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        const redirect = () => this.props.history.push('/home')
        this.props.dispatch(startLoginUser(formData, redirect))
        console.log(formData)
        
    }

    render(){
        return(
            <div  style = {imageStyle}>
                <MDBContainer >
                    <br></br>
                    <br></br>
                <h1 className="display-4" style = {headerStyle} ><strong>Login Form</strong></h1>
                <br></br>
                    <br></br>
          <MDBRow>
          <MDBCol md="3">
              </MDBCol>
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Login</strong>
                    </h3>
                  </div>
                  <MDBInput
                    label="Your email"
                    // className={this.state.email.valid ? "is-valid" : "is-invalid"}
                    value = {this.state.email}
                    type="email"
                    name = "email"
                    onChange = {this.handleForm}
                    success="right"
                  >
               {/* <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Provide a valid Email!</div> */}
                </MDBInput>
                  <MDBInput
                    label="Your password"
                    type="password"
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.handleForm}
                    containerClass="mb-0"
                  />
                  {/* <p className="font-small blue-text d-flex justify-content-end pb-3">
                    Forgot
                    <a href="#!" className="blue-text ml-1">
    
                      Password?
                    </a>
                  </p> */}
                  <br></br>
                  <br></br>
                  <div className="text-center mb-3">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                      onClick = {this.handleSubmit}
                    >
                      Log in
                    </MDBBtn>
                  </div>
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Not a Registered?
                    <a  className="blue-text ml-1">
    
                      <Link to = "/register" >Register</Link>
                    </a>
                  </p>
                </MDBModalFooter>
              </MDBCard>
            </MDBCol>
            <MDBCol md="3">
              </MDBCol>
          </MDBRow>
        </MDBContainer>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {

}

export default connect()(LoginPage)