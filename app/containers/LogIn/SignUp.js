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

class SignUp extends Component {
  state = {    
    name: {value: '', isValid: true, message: ''},    
    email: {value: '', isValid: true, message: ''},
    password: {value: '', isValid: true, message: ''},
    hasErrors: false,
    redirectToHome: false,
    serverError: ''        
  };

  handleUserInput = (e) => {  
    const state = this.state;
    state[e.target.name].value = e.target.value;
    this.setState(state);
  }

  handleSubmitForm = (e) => { 
    this.resetValidationStates(); //reset states before the validation.

    if (this.formIsValid()) {      
      let payload = {
        "name": this.state.name.value,        
        "email": this.state.email.value,
        "password": this.state.password.value,      
      };
      console.log('payload', payload);

      let path = BASE_URL + "/v1/auth/register";
      let reqObject = payload;
      axios({      
        method: 'post',
        url: path,
        data: reqObject,      
      })
      .then(response => {
        // console.log(response.data);
        
        const auth = { 
          loggedIn : true, 
          user: response.data.user,
          token: response.data.token
        };
        ls.set('auth', auth);
        this.setState({redirectToHome: true});

      }) 
      .catch((error) => {
        console.log(error.response.data);
        this.setState({serverError: error.response.data.message});
      });      
    }
  }  

  resetValidationStates = () => {    
    const state = this.state;
    Object.keys(state).map(key => {
      if (state[key].hasOwnProperty('isValid')) {
        state[key].isValid = true;
        state[key].message = '';
      }
    });
    state.hasErrors = false;
    this.setState(state);
  } 

  formIsValid = () => {
    const state = this.state;    

    if (state.name.value === '') {
      state.name.isValid = false; //this will trigger the has-error class
      state.name.message = 'Name can not be empty'; 
      state.hasErrors = true;
      this.setState(state);     
    }    

    if (state.email.value === '') {
      state.email.isValid = false; //this will trigger the has-error class
      state.email.message = 'Email can not be empty'; 
      state.hasErrors = true;
      this.setState(state);     
    }

    if (state.password.value === '') {
      state.password.isValid = false; //this will trigger the has-error class
      state.password.message = 'Password can not be empty'; 
      state.hasErrors = true;
      this.setState(state);      
    }    

    if(this.state.hasErrors) {
      return false;
    }
    
    return true;
  }
    
  render() {
    const { name, email, password } = this.state;

    if(this.state.redirectToHome) {
      return <Redirect to='/home' />;
    }
        
    return (
      <Container>         
        <Row>         
          <Col sm="12" md={{ size: 6, offset: 3 }} >
            <Card style={{padding: '0px 10px 10px 10px', marginBottom: '10px', marginTop: '10%'}}>
              <div style={{marginTop: '10px'}}>
                <Row>
                  <Col>
                    <h4 style={{textAlign: 'center'}}>Sign Up</h4>
                  </Col>                                       
                </Row>
                <Row className="divider"></Row>

                <Row>
                  <Col style={{padding: '20px'}}>
                    <div style={{textAlign: 'center', color: 'red'}}>                  
                      {this.state.serverError}
                    </div>
                    <Form>
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input invalid={!name.isValid} type="text" name="name" value={name.value} onChange={this.handleUserInput} placeholder="Full Name" />
                        <FormFeedback>{name.message}</FormFeedback>
                      </FormGroup>                      
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input invalid={!email.isValid} type="email" name="email" value={email.value} onChange={this.handleUserInput} placeholder="Email" />
                        <FormFeedback>{email.message}</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input invalid={!password.isValid} type="password" name="password" value={password.value} onChange={this.handleUserInput} placeholder="Password" />
                        <FormFeedback>{password.message}</FormFeedback>
                      </FormGroup>                      
                      <div style={{textAlign: 'center'}}>
                        <Button color="primary" onClick={this.handleSubmitForm} >SignUp</Button>
                        <Link to="login" style={{float: 'right', marginTop: '5px'}}>
                          <Button outline color="secondary" size="sm">LogIn</Button>
                        </Link>
                      </div>
                    </Form> 
                  </Col>                                             
                </Row>
              </div>
            </Card>          
          </Col>
        </Row>       
      </Container>
    );
  }
}

export default SignUp;
