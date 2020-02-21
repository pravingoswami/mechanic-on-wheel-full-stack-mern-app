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
        <NavbarBrand href="/">Mechanic On Wheel</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to = "/home" style = {this.linkStyle} >HOME</Link></NavLink>
            </NavItem>

          {
            Object.keys(this.props.user).length > 0 ? (
              <React.Fragment>
              <NavItem>
              <NavLink ><Link to ="/notes" style = {this.linkStyle} >NOTES</Link></NavLink>
            </NavItem>
  
            <NavItem>
              <NavLink ><Link to ="/categories" style = {this.linkStyle} >CATEGORIES</Link></NavLink>
            </NavItem>
  
            <NavItem>
              <NavLink ><Link to ="/home" style = {this.linkStyle} onClick = {this.handleLogout } >LOGOUT</Link></NavLink>
            </NavItem>
  
            
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
      <Route path = "/register" component = {RegisterPage} />
      <Route path = "/login" component = {LoginPage} />

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