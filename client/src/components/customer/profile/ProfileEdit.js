import React from 'react'
import {connect} from 'react-redux'
import RegisterUser from '../register/RegisterUser'
import 'bootstrap/dist/css/bootstrap.css'
import { Container, Form, Label, Input, Button } from 'reactstrap'
import { startEditUser } from '../../../actions/usersActions'

class ProfileEdit extends React.Component{

    constructor(props){
        super(props)
            this.state = {
                name : props.user.name,
                username : props.user.username,
                email : props.user.email,
                mobile : props.user.mobile,
                avatar : '',
                shopName : props.user.shopName && props.user.shopName
            }
    }

    handleFormData = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleAvatar = (e) => {
        console.log('avatara', e.target.files[0])
        this.setState({avatar : e.target.files[0]})
      }

      handleSubmit = (e) => {
          e.preventDefault()
            let formData = {
            name : this.state.name,
            username : this.state.username,
            email : this.state.email,
            mobile : this.state.mobile,
          }

          const data = new FormData
          for(let key in formData){
              data.append(key, formData[key])
          }

          this.state.avatar != '' && data.append('avatar', this.state.avatar)
          this.state.shopName != '' && data.append('shopName', this.state.shopName)

          console.log(formData)
        const redirect = () => this.props.history.push('/profile')
          this.props.dispatch(startEditUser(data, redirect))
      }


    render(){
        return(
            <div>
                <Container>
                    <br></br>
                    <h1>Edit Profile</h1>
                    <br></br>
                    <Form>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value = {this.state.name} onChange = {this.handleFormData}  />
                    <br></br>
                    <Label for="username">Username</Label>
                    <Input type="text" name="username" id="username" value = {this.state.username} onChange = {this.handleFormData}  />
                    <br></br>
                    <Label for="email">email</Label>
                    <Input type="email" name="email" id="email" value = {this.state.email} onChange = {this.handleFormData}  />
                    <br></br>
                    <Label for="mobile">Mobile</Label>
                    <Input type="text" name="mobile" id="mobile" value = {this.state.mobile} onChange = {this.handleFormData}  />
                    <br></br>
                    {
                        this.props.user.shopName && (
                           <React.Fragment>
                                <Label for="shopName">ShopName</Label>
                    <Input type="text" name="shopName" id="shopName" value = {this.state.shopName} onChange = {this.handleFormData}  />
                    <br></br>
                           </React.Fragment>

                        )
                    } 
                   <Label for="avatar" >Profile Picture</Label>
        <Input type="file" name="avatar" id="avatar"  enctype="multipart/form-data" onChange = {this.handleAvatar}  />
        <br></br>
        <Button color = "primary" onClick = {this.handleSubmit} >Submit</Button>


                   
                    </Form>
                </Container>
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