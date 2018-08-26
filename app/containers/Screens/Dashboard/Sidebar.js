import React, { Component, Fragment } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
// import css
import "./Sidebar.scss";

class Sidebar extends Component {
   
  constructor(props){
    super(props);

    this.state = {
      activeTabIndex: '-1',      
    };        
  }

  componentWillMount(){       
       
  }  
    
  componentDidMount() {
    
  } 

  handlerActive = (activeTabIndex, id_str) => {    
    this.setState({'activeTabIndex': activeTabIndex});
    this.props.handleSelectedList(id_str);
  }
  
      
  render() {
    const { statuses } = this.props.data;
    const { activeTabIndex } = this.state;    
    return (
      <Fragment>
        <div className="box box-primary">
          {/* <div className="box-header with-border">
              <h3 className="box-title"> Help </h3>
          </div> */}
          <div className="box-body"> 
            <ListGroup>              
              {
                statuses.map((status, index) => {
                  return (
                      <ListGroupItem 
                        key={index} 
                        onClick={ (e) => this.handlerActive(index, status.id_str) }                        
                        style={{ background: activeTabIndex === index ? '#72bcd4' : ''}}
                      >                       
                        {status.text}
                      </ListGroupItem>
                  );
                })
              }
            </ListGroup>
          </div>
            
        </div>        
      </Fragment>
    );
  }
}

export default Sidebar;
