import { HOME_DATA, CLEAR_STATE_VALUE } from '../../constants/ActionTypes';

let intialData = {
  data: null,
  fetching: true
};

export default function reducer(state = intialData, action) {
  switch(action.type) {
    case HOME_DATA:       
      return Object.assign({}, state, action.payload);  
    case CLEAR_STATE_VALUE:            
      return Object.assign({}, state, action.payload);     
    default:
      return state;  
  }  
}
