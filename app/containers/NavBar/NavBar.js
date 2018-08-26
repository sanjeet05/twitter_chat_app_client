import React, { Component } from "react";
import { withRouter, Link, NavLink, Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  
} from "reactstrap";
import ls from 'local-storage';

import { SOCKET_URL } from '../../constants/ServerUrl';
// socket
import socketIOClient from 'socket.io-client';


class NavBar extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      isOpen: false,
      user: {},
      isLogOut: false,
      endpoint: SOCKET_URL,
    };

    this.socket = socketIOClient(this.state.endpoint);

    this.logOutUser = () => {        
      this.socket.emit('LOGOUT_USER', {
        username: this.state.user.username            
      });
    };
  }


  componentDidMount(){
    const auth = ls.get('auth');      
    this.setState({ user: auth.user }); 
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  handleUserLogOut = (e) => {
    ls.remove('auth');
    this.logOutUser();
    this.setState({isLogOut: true});
  }


  render() {
    if (this.state.isLogOut) {
      return <Redirect to='/login' />;
    }

    return (
      <div className="top_navbar">
        <Container>
          <Navbar color="faded" light expand="md">
            <Link to="/home">
              <div className="navbar-brand top_logo_name">
                Richpanel
              </div>              
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>              
              <Nav className="ml-auto" navbar>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    {this.state.user.name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick = { () => this.props.history.push(`/settings`)}>
                      Settings
                    </DropdownItem>
                    <DropdownItem onClick={this.handleUserLogOut}>
                      Log Out
                    </DropdownItem>                 
                  </DropdownMenu>                  
                </UncontrolledDropdown>
              </Nav>
            </Collapse>    
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default withRouter(NavBar);
