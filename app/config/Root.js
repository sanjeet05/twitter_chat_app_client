import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';

// redux imports start
import { Provider } from "react-redux";
import store from "../store.js";

import App from '../containers/App';

import PrivateRoute from './PrivateRoute';

// login
import LogIn from '../containers/LogIn/LogIn';
import SignUp from '../containers/LogIn/SignUp';
import Settings from '../containers/LogIn/Settings';

// home
import Home from '../containers/Screens/Dashboard/Home';

const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {/* Login */}
          <Route exact path="/" component={LogIn} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />                    

          {/* MainLayout */}
          <App>
            {/* home */}            
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/settings" component={Settings} />
          </App>
        </Switch>
      </Router>
    </Provider>  
  );
};

export default Root;

