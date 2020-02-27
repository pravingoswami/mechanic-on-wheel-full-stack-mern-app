import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { MDBContainer, MDBFileInput , MDBRow, MDBInput, MDBSelect , MDBModalFooter } from 'mdbreact'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Link} from 'react-router-dom'
import { startRegisterUser } from '../../../actions/usersActions'

const customerImage  =  require('../../../images/customer.jpg')
const serviceProviderImage  =  require('../../../images/serviceprovider.png')



const headerStyle = {
    textAlign : "center",
    color : "white"
    // margin : "50px 0 50px 0"
}
const imageStyle = {
    backgroundImage: `url("https://wallpaperaccess.com/full/1726177.jpg")`,
backgroundRepeat: 'no-repeat',
backgroundSize: 'cover',
backgroundPosition: 'center center',
height : "95vh"

}

class RegisterUser extends React.Component{

    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            username : '',
            mobile : '',
            name : '',
            role : '',
            gender : '',
            genders : ['Male', 'Female'],
            avatar : '',
            lisenceNumber : '',
            lisenceImage : '',
            serviceType : '',
            shopName : ''
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
            password : this.state.password,
            username : this.state.username,
            mobile : this.state.mobile
        }
        const redirect = () => this.props.history.push('/login')
        this.props.dispatch(startRegisterUser(formData, redirect))
        console.log(formData)
        
    }

    handleRole = (role) => {
        console.log(role)
        this.setState({role : role})
    }

    handleServiceType = (serviceType) => {
        console.log(serviceType)
        this.setState({serviceType : serviceType})
    }

    render(){
        return(
            <div>


                 <div  style = {imageStyle}>
                <MDBContainer >
                    <br></br>
                    <br></br>
                <h1 className="display-4" style = {headerStyle} ><strong>Registration Form</strong></h1>
                <br></br>
                    <br></br>


                        
                <div>
                        {
                            (this.state.role === '') && (
                                <MDBRow >
                                <MDBCol onClick = {() => this.handleRole('customer')}>
                     <MDBCard style={{ width: "27rem" }}>
                         <MDBCardImage className="img-fluid" src={customerImage} waves />
                         <MDBCardBody>
                         <MDBCardTitle>Register as Customer</MDBCardTitle>
                         </MDBCardBody>
                     </MDBCard>
                     </MDBCol>
         
                     <MDBCol onClick = {() => this.handleRole('serviceProvider')} >
                     <MDBCard style={{ width: "27rem" }}>
                         <MDBCardImage className="img-fluid" src= {serviceProviderImage} waves />
                         <MDBCardBody>
                         <MDBCardTitle>Register as ServiceProvider</MDBCardTitle>
                         </MDBCardBody>
                     </MDBCard>
                     </MDBCol>
                                </MDBRow>
                            )
                        } 
                </div>

                        
                    
                    <div>{console.log(this.state.serviceType)}   
                    { 
                            (this.state.serviceType === '' && this.state.role === 'serviceProvider' ) && (
                                <MDBRow >
                                <MDBCol onClick = {() => this.handleServiceType('Service Provider as Remotely')}>
                     <MDBCard style={{ width: "27rem" }}>
                         <MDBCardImage className="img-fluid" src={customerImage} waves />
                         <MDBCardBody>
                         <MDBCardTitle>Service Provider as Remotely</MDBCardTitle>
                         </MDBCardBody>
                     </MDBCard>
                     </MDBCol>
         
                     <MDBCol onClick = {() => this.handleServiceType('Service Provider as Shop Owner')} >
                     <MDBCard style={{ width: "27rem" }}>
                         <MDBCardImage className="img-fluid" src= {serviceProviderImage} waves />
                         <MDBCardBody>
                         <MDBCardTitle>Service Provider as Shop Owner</MDBCardTitle>
                         </MDBCardBody>
                     </MDBCard>
                     </MDBCol>
                                </MDBRow>
                            )
                        } 
                    </div>
                                            
                        <div>
                            {
                                (this.state.role == 'customer' || this.state.serviceType !== '') && (
                                     <MDBRow>
          <MDBCol md="1">
              </MDBCol>
            <MDBCol md="10">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Register</strong>
                    </h3>
                  </div>
                <MDBRow>
                    <MDBCol md = "6" >
                    <MDBInput
                    label="Your Name"
                    value = {this.state.name}
                    type="text"
                    name = "email"
                    onChange = {this.handleForm}
                    success="right"
                  >
                </MDBInput>

                <MDBInput
                    label="Your Email"
                    value = {this.state.email}
                    type="email"
                    name = "email"
                    onChange = {this.handleForm}
                    success="right"
                  >
                </MDBInput>

                <MDBInput
                    label="Your Mobile No."
                    value = {this.state.mobile}
                    type="text"
                    name = "mobile"
                    onChange = {this.handleForm}
                    success="right"
                  >
                </MDBInput>

                <MDBInput
                    label="Your Lisence Number"
                    value = {this.state.lisenceNumber}
                    type="text"
                    name = "lisenceNumber"
                    onChange = {this.handleForm}
                    success="right"
                  >
                </MDBInput>

              
                {
                  this.state.serviceType === "Service Provider as Shop Owner" && (
                    <MDBInput
                    label="Your Shop Name"
                    value = {this.state.shopName}
                    type="text"
                    name = "shopName"
                    onChange = {this.handleForm}
                    success="right"
                  >
                </MDBInput>
                  )
                }

                  <MDBInput
                    label="Your password"
                    type="password"
                    name = "password"
                    value = {this.state.password}
                    onChange = {this.handleForm}
                    containerClass="mb-0"
                  />
                        </MDBCol>

                        <MDBCol md = "6">
                        <MDBInput
                    label="Your Username"
                    value = {this.state.username}
                    type="text"
                    name = "username"
                    onChange = {this.handleForm}
                    success="right"
                  >
                </MDBInput>

               

                <Label for="gender">Select</Label>
        <Input type="select" name="gender" id="gender" onChange = {this.handleGender} >
          <option>Select</option>
            {
              this.state.genders.map((gen, i) => <option key = {i} value = {gen} >{gen}</option>)
            }
        </Input>

        <br></br>

                <Label for="avatar" onChange = {this.handleAvatar} >Profile Picture</Label>
        <Input type="file" name="avatar" id="avatar" />
        <br></br>

        <Label for="lisenceImage" onChange = {this.handleProfile} >Lisence Image</Label>
        <Input  type="file" name="lisenceImage" id="lisenceImage" />


       

                        </MDBCol>
                </MDBRow>
              
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
                      Register
                    </MDBBtn>
                  </div>


                 
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Already Registered?
                    <a  className="blue-text ml-1">
    
                      <Link to = "/login" >Login</Link>
                    </a>
                  </p>
                </MDBModalFooter>
              </MDBCard>
            </MDBCol>
            <MDBCol md="1">
              </MDBCol>
          </MDBRow>
                                )
                            }
                        </div>
                        
        </MDBContainer>
            </div>
            </div>
        )
    }
}

export default RegisterUser