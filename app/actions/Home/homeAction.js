import { HOME_DATA } from '../../constants/ActionTypes';
import { BASE_URL } from '../../constants/ServerUrl';
import axios from 'axios';

function dataDispatch(data, isFetched) {
  return {
    type: HOME_DATA,
    payload: {data: data, fetching: isFetched}
  };
}

export const getHomeData = () => {
  return async (dispatch) => { 
    
    const path = BASE_URL + '/v1/tweet/get_search_tweets';
    let reqObject = {}; 
    try {   
      const response = await axios({  
          method: 'post',
          url: path,
          data: reqObject,      
      });
      dispatch(dataDispatch(response.data, false));
    } catch(error) {
      console.log(error);
    }

  };
};
