import React from 'react';
import NavBar from './NavBar/NavBar';


const App = (props) => {
  return (
    <div>      
      <NavBar />
      <div className="main_container">
        {
          (() => {
            return (
              props.children
            );
          }) ()
        }
      </div>      
    </div>
  );
};

export default App;
