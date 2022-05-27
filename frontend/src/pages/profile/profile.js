import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from "../../reducers/userReducer";
import styles from "./style.css";

export const Profile = () => {
  const accessToken = useSelector((store) => store.user.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    } else {
      navigate("/profile");
    }
  }, [accessToken]);

  const onClick = () => {
    dispatch(user.actions.setFirstName(''));
    dispatch(user.actions.setLastName(''));
    dispatch(user.actions.setEmail(''));
    dispatch(user.actions.setGender(''));
    dispatch(user.actions.setBYear(''));
    dispatch(user.actions.setBMonth(''));
    dispatch(user.actions.setBDay(''));
    dispatch(user.actions.setToken(''));
  };

  return (
    <div className="container">
      <div className="title">
        <h1>profile</h1>
      </div>
      <button onClick={onClick}>log out</button>
    </div>
  );
};
