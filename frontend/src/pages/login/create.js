import React from "react";
import { useDispatch } from "react-redux";
import user from "../../reducers/userReducer";
import styles from "./style.css";
export const Create = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(user.actions.setMode(true));
  };


const onSubmit = () => {}


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
        <div className="loginFormTwo">
          <input type="text" placeholder="Email adress or phone number"></input>
          <input type="text" placeholder="Password"></input>
          <div className="btnCreateContainer">
            <button type="submit" className="btnSignUp">
              Sign up
            </button>

            <button type="submit" className="btnLoginCreate" onClick={onClick}>
              Log in
            </button>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
};
