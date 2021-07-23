import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialUserInfo = {
    username:"",
    password:"",
    error:""
}

const Login = () => {

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const {push} = useHistory();

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });
  const updateForm = e=>{
    setUserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    })
  }
  
  const login = e=>{
    e.preventDefault();
    if (userInfo.username === "Lambda" && userInfo.password === "School") {
      axiosWithAuth()
        .post("/login", userInfo)
        .then(res=>{
          localStorage.setItem("token", res.data.payload);
          push("/protected");
          setUserInfo(initialUserInfo);
        })
        .catch(error=>{
          console.log(error);
        })
    }
    else{
      setUserInfo({
        ...userInfo,
        error: "Username or Password not valid." 
      })
    }
  }

  const error = userInfo.error;
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={login}>
          <label>Username:
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={updateForm}
              />
          </label>
          <label>Password:
              <input
                type="text"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={updateForm}
              />
          </label>
          <button id="submit">Login</button>
        </form>
      </div>
      

      {userInfo.error && <p id="error">{error}</p>}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"