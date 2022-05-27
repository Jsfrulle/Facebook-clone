import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { batch, useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/loading";
import user from "../../reducers/userReducer";
import styles from "./activate.css";
export const Activate = () => {
  const [activateSuccess, setActivateSuccess] = useState();
  const [activateError, setActivateError] = useState();
  const [notificationPopup, setNotificationPopup] = useState(false);
  const {token} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.user.loading);



useEffect(async() => {



  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify({token:token})
  };

  await fetch(`http://localhost:8080/activate`, options)
    .then((response) => response.json())
    .then((data) => {
      dispatch(user.actions.setLoading(true));


      if (data.response) {
        batch(() => {
          dispatch(user.actions.setLoading(false));
          setNotificationPopup(true);
          dispatch(user.actions.setFirstName(data.response.first_name));
              dispatch(user.actions.setLastName(data.response.last_name));
              dispatch(user.actions.setEmail(data.response.email));
              dispatch(user.actions.setGender(data.response.gender));
              dispatch(user.actions.setBYear(data.response.bYear));
              dispatch(user.actions.setBMonth(data.response.bMonth));
              dispatch(user.actions.setBDay(data.response.bDay));
          dispatch(user.actions.setToken(token));
          setActivateSuccess(data.response.message);
          console.log(data.response.message);

          setTimeout(() => {
            setNotificationPopup(false);
            navigate("/profile"); 
          }, 3000);

         
        });
      } else {
      
        batch(() => {
          dispatch(user.actions.setLoading(false));
          dispatch(user.actions.setFirstName(''));
              dispatch(user.actions.setLastName(''));
              dispatch(user.actions.setEmail(''));
              dispatch(user.actions.setGender(''));
              dispatch(user.actions.setBYear(''));
              dispatch(user.actions.setBMonth(''));
              dispatch(user.actions.setBDay(''));
          dispatch(user.actions.setToken(''));
          console.log(data.message);
          setActivateError(data.message);
        });
      }
    }); 




  console.log('hello')
}, [])



  

  return (
    <div className="containerActivate">
      {loading ? (
        <Loading />
      ) : (
        <div >
          <p> {activateSuccess} </p>
          <p>ERRO: {activateError}</p>
        </div>
      )}

      {notificationPopup ? (
        <div className="popUp">
          <h1>Activation successful!!!! </h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
