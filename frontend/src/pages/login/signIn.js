import React, { useState, useEffect } from "react";
import { useDispatch, batch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../../reducers/userReducer";
import styles from "./style.css";
export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const accessToken = useSelector((store) => store.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  }, [accessToken]);

  const onClick = () => {
    dispatch(user.actions.setMode(false));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    };

    await fetch(`http://localhost:8080/login`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.response) {
          batch(() => {
            dispatch(user.actions.setFirstName(data.response.first_name));
            dispatch(user.actions.setLastName(data.response.last_name));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setEmail(data.response.email));
            dispatch(user.actions.setGender(data.response.gender));
            dispatch(user.actions.setToken(data.response.token));
            dispatch(user.actions.setBYear(data.response.bYear));
            dispatch(user.actions.setBMonth(data.response.bMonth));
            dispatch(user.actions.setBDay(data.response.bDay));

            console.log(data.response.message);
          });
        } else {
          batch(() => {
            console.log(data.message);
            setMessage(data.message);
          });
        }
      });
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrap">
        <form className="login" onSubmit={onSubmit}>
          <div className="loginFormOne">
            <img src="../../icons/facebook.svg" alt="Facebook" className="" />
            <h1>
              Facebook helps you connect and share with the people in your life
            </h1>
            
          </div>
          <div className="loginContainer">
          <div className="loginFormTwo">
         
            <input
              type="text"
              minLength={3}
              placeholder="Email adress or phonenumber"
              autocomplete="off"
              required="required"
              value={email.toLocaleLowerCase()}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              id="password"
              type="password"
              minLength={6}
              maxLength={40}
              value={password}
              autocomplete="off"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required="required"
            ></input>
           
            <button type="submit" className="btnLogin" onSubmit={onSubmit}>
              Log in
            </button>
            <p className="textForgotPassword"> Forgotten password?</p>
<div className="hr" ></div>
            <button type="submit" className="btnCreate" onClick={onClick}>
              Create Account
            </button>
            <div className="messageContainer" >
              {message ? (
                <p className="messageP"> {message} </p>
              ) : (
                ""
              )}
            </div>
          </div>
          <h3 className="textInfoBusiness">
            {" "}
            <span>Create a page</span> for celeberity, brand or business.
          </h3></div>
        </form>
      </div>
      <div className="regiter"></div>
    </div>
  );
};
