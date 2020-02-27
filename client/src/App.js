import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from "react-router-dom"
import HomePage from './components/home/Home';
import RegisterPage from './components/customer/register/Register';
import LoginPage from './components/customer/login/Login';
import { startLogoutUser } from './actions/usersActions';
import VahicalList from './components/customer/vehical/VahicalList';
import NewVehical from './components/customer/vehical/NewVehical';
import ShowVehical from './components/customer/vehical/ShowVehical';
import ProfileShow from './components/customer/profile/ProfileShow';
import ProfileEdit from './components/customer/profile/ProfileEdit';
import RegisterUser from './components/customer/register/RegisterUser';


class App extends React.Component{

  constructor(){
    super()
    this.state = {
      isOpen : false,
      setIsOpen : false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      setIsOpen : !prevState.setIsOpen
    }))
  }

  linkStyle = {
    textDecoration : "none",
    color : "inherit"
  }

  handleLogout = () => {
    console.log('hi')
    this.props.dispatch(startLogoutUser())
  }

  render(){
    return(
      <div>
        <BrowserRouter>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/"><strong>Mechanic On Wheel</strong></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to = "/home" style = {this.linkStyle} >HOME</Link></NavLink>
            </NavItem>

          {
            Object.keys(this.props.user).length > 0 ? (

                <React.Fragment>

              
              {
                this.props.user.role == 'customer' && (
                  <React.Fragment>
                  <NavItem>
                  <NavLink ><Link to ="/profile" style = {this.linkStyle} >PROFILE</Link></NavLink>
                </NavItem>
      
                <NavItem>
                  <NavLink ><Link to ="/vehicals" style = {this.linkStyle} >VEHICALS</Link></NavLink>
                </NavItem>
    
                <NavItem>
                  <NavLink ><Link to ="/issue-history" style = {this.linkStyle} >ISSUE HISTORY</Link></NavLink>
                </NavItem>
      
                <NavItem>
                  <NavLink ><Link to ="/home" style = {this.linkStyle} onClick = {this.handleLogout } >LOGOUT</Link></NavLink>
                </NavItem>
      
                
                </React.Fragment>
              
              )
                }

{
  
  this.props.user.serviceType == 'Service Provider as Remotely' && (
    <React.Fragment>
    <NavItem>
    <NavLink ><Link to ="/profile" style = {this.linkStyle} >PROFILE</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/vehicals" style = {this.linkStyle} >VEHICALS</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/issue-history" style = {this.linkStyle} >SOLUTION HISTORY</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/home" style = {this.linkStyle} onClick = {this.handleLogout } >LOGOUT</Link></NavLink>
  </NavItem>


  
  </React.Fragment>
  )
}

{
  
  this.props.user.serviceType == 'Service Provider as Shop Owner' && (
    <React.Fragment>
    <NavItem>
    <NavLink ><Link to ="/profile" style = {this.linkStyle} >PROFILE</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/vehicals" style = {this.linkStyle} >SHOPS</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/issue-history" style = {this.linkStyle} >SOLUTION HISTORY</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/home" style = {this.linkStyle} onClick = {this.handleLogout } >LOGOUT</Link></NavLink>
  </NavItem>


  
  </React.Fragment>
  )
}

{
  
  this.props.user.role == 'admin' && (
    <React.Fragment>
    <NavItem>
    <NavLink ><Link to ="/profile" style = {this.linkStyle} >PROFILE</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/vehicals" style = {this.linkStyle} >VEHICALS</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/issue-history" style = {this.linkStyle} >SOLUTION HISTORY</Link></NavLink>
  </NavItem>

  <NavItem>
    <NavLink ><Link to ="/home" style = {this.linkStyle} onClick = {this.handleLogout } >LOGOUT</Link></NavLink>
  </NavItem>


  
  </React.Fragment>
  )
}
              

              </React.Fragment>



            ) : (
              <React.Fragment>
              <NavItem>
              <NavLink ><Link to ="/login" style = {this.linkStyle} >LOGIN</Link></NavLink>
            </NavItem>
  
            <NavItem>
              <NavLink ><Link to ="/register" style = {this.linkStyle} >REGISTER</Link></NavLink>
            </NavItem>
            </React.Fragment>
            )
          }






          </Nav>
        </Collapse>
      </Navbar>


      <Route path = "/home" component = {HomePage} />
      <Route path = "/register" component = {RegisterUser} />
      <Route path = "/login" component = {LoginPage} />

      <Route path = "/vehicals" component = {VahicalList} exact = {true} />
      <Route path = "/vehicals/add-vehicals" component = {NewVehical} exact = {true}/>
      <Route path = "/vehicals/show/:vehical" component = {ShowVehical} exact = {true}/>

      <Route path = "/profile" component = {ProfileShow} exact = {true} />
      <Route path = "/profile/edit" component = {ProfileEdit} exact = {true} />
    

    </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.user
  }
}

export default connect(mapStateToProps)(App)