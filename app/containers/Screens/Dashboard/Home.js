import React, { Component, Fragment } from 'react';
import { 
  Container, 
  Row, 
  Col,
} from 'reactstrap';
// socket
import socketIOClient from 'socket.io-client';
import { SOCKET_URL } from '../../../constants/ServerUrl';

import ls from 'local-storage';
import axios from 'axios';
import { BASE_URL } from '../../../constants/ServerUrl';

// redex imports
import { connect } from "react-redux";
import { getHomeData } from "../../../actions/Home/homeAction";

// chat
import Chat from './Chat'; 

import Sidebar from './Sidebar'; 

// import css
import "./Home.scss";

class Home extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      user: '',      
      selectedList: null,
      isFetchedTweet : false,
      tweetList: [], 
      twid: null,
      endpoint: SOCKET_URL,    
    };

    this.socket = socketIOClient(this.state.endpoint);
    
    this.addUser = (email) => {      
      this.socket.emit('SEND_USER', {
        username: email,        
      });      
    }; 
  }

  componentWillMount(){      
    const auth = ls.get('auth');  
    if (auth) {
      const user = auth.user;          
      this.setState({user: user, fetching: false});      
    } else {
      this.setState({fetching: false});
    }  
  }  
    
  componentDidMount() {
    this.addUser(this.state.user.email);
    this.props.getHomeData();
  } 

  handleSelectedList = (id) => {
    // console.log(id);
    this.setState({ isFetchedTweet: false}); 

    const path = BASE_URL + '/v1/tweet/get_tweets';
    let reqObject = { twid:id }; 
    axios({  
        method: 'post',
        url: path,
        data: reqObject,      
    }).then((response) => {          
      // console.log(response);
      this.setState({ tweetList: response.data, twid: id, isFetchedTweet: true});
    });        
  
  }

  render() {
    const fetching = this.props.home.fetching;
        
    const loader = <div className="loader">Loading ...</div>;
         
    return (
      <Fragment>
        
        <Container>       
          <Row className="show-grid">         
            <Col sm={12} md={12} >
              <div className="welcome_title">Welcome to Help Desk!</div>
            </Col>
          </Row>
          {
            !fetching 
            ?
            <Row className="show-grid">         
              <Col sm={6} md={{ size: 3, offset: 2}}>
                <Sidebar 
                  data={this.props.home.data} 
                  handleSelectedList={this.handleSelectedList}
                />
              </Col>
              <Col sm={6} md={6}>
              {
                (
                  () => {
                    if(!this.state.isFetchedTweet){
                      return (
                        <div className="box box-primary">
                          <div className="box-body">
                            <div className="chat_loading">
                              loading...
                            </div>                           
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <Chat 
                          user={this.state.user}
                          tweetList={this.state.tweetList}
                          twid={this.state.twid}
                        />
                      );
                    }
                  }
                )()
              }                
              </Col>
            </Row>
            :
            loader          
          }
                 
        </Container>        
      </Fragment>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    home: store.homeReducer,
  };
};

const mapDispatchToProps = {
  getHomeData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);


