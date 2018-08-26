import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { 
    Container, 
    Row, 
    Col,      
    Card,
    Button,     
    Form,
    FormGroup,
    Input, 
    Label,  
    FormFeedback,
} from 'reactstrap';

import { BASE_URL } from '../../constants/ServerUrl';
import axios from 'axios';
import ls from 'local-storage';

import TwitterLogin from 'react-twitter-auth';

class Settings extends Component {
  state = {    
    isAuthenticated: false, 
    user: null, 
    token: '' ,      
  };
  
  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({isAuthenticated: true, user: user, token: token});
      }
    });
  };

  onFailed = (error) => {
    console.log(error);
  };

  render() {
            
    return (
      <Container>         
        <Row>         
          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <Card style={{padding: '0px 10px 10px 10px', marginBottom: '10px', marginTop: '25%'}}>
              <div style={{margin: '20px', textAlign: 'center'}}>                
                {/* <TwitterLogin 
                  loginUrl="http://localhost:3100/api/v1/auth/twitter"
                  onFailure={this.onFailed} 
                  onSuccess={this.onSuccess}
                  requestTokenUrl="http://localhost:3100/api/v1/auth/twitter/reverse"
                /> */}
                <Button outline color="primary" size="sm">Sign in with Twitter</Button>
                                
              </div>
            </Card>          
          </Col>
        </Row>       
      </Container>
    );
  }
}

export default Settings;
