import React, { useState } from "react";
import { BrowserRouter as Router, Route , Link} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {

  const logout = (e)=>{
    localStorage.removeItem("token");
  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <Link onClick={logout} data-testid="logoutButton" to="/">  logout</Link>
        </header> 
        <PrivateRoute exact path="/protected" component={BubblePage}/>
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.