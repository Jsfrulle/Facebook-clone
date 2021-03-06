import React, { useState, useEffect } from "react";
import { useDispatch, batch, useSelector } from "react-redux";
import user from "../../reducers/userReducer";
import styles from "./style.css";
export const Create = () => {
  const dispatch = useDispatch();
 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [bYear, setBYear] = useState("");
  const [bMonth, setBMonth] = useState("");
  const [bDay, setBDay] = useState("");
  const [notificationPopupReg, setNotificationPopupReg] = useState(false);
  const [message, setMessage] = useState('hello world');
  const onClick = () => {
    dispatch(user.actions.setMode(true));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      gender === "" ||
      bDay === ""
    ) {
      if (gender === "") {
        setMessage("Please select a gender");
      }
    } else {
      const options = {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          password: password,
          email,
          gender,
          bYear,
          bMonth,
          bDay
        })
      };

      await fetch(`http://localhost:8080/register`, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.response) {
            setNotificationPopupReg(true);

            setTimeout(() => {
           
              dispatch(user.actions.setMode(true));
              setNotificationPopupReg(false);
              setFirstName("");
              setLastName("");
              setPassword("");
              setEmail("");
              setBDay("");
              setBMonth("");
              setBYear("");
            }, 2000);

            batch(() => {
              dispatch(user.actions.setFirstName(data.response.first_name));
              dispatch(user.actions.setLastName(data.response.last_name));
              dispatch(user.actions.setEmail(data.response.email));
              dispatch(user.actions.setGender(data.response.gender));
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
    }
  };

  return (
    <div className="create-wrapper">
      {notificationPopupReg ? (
        <div className="popUp">
          {" "}
          <h1>Registartion successful!!!! </h1>
        </div>
      ) : (
        ""
      )}

      <div className="create-wrap">
        <form className="create" onSubmit={onSubmit}>
          <div className="createFormOne">
            <img src="../../icons/facebook.svg" alt="Facebook" className="" />
            <h1>
              Facebook helps you connect and share with the people in your life
            </h1>

            <div className="messageContainerCreate">
              {message ? <p className="messageP"> {message} </p> : ""}</div>
          </div>
          <div className="createForm">
            <input
              type="email"
              placeholder="Email"
              value={email.toLocaleLowerCase()}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
<div className="createNameContainer"> 
            <input
              minLength={2}
              maxLength={20}
              type="text"
              placeholder="Firstname"
              value={firstName.toLocaleLowerCase()}
              onChange={(e) => setFirstName(e.target.value)}
            ></input>

            <input
              minLength={2}
              maxLength={20}
              type="text"
              placeholder="Lastname"
              value={lastName.toLocaleLowerCase()}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
</div>
            <input
              minLength={6}
              maxLength={40}
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>

            <div className="divPYear">
              <p>When were you born?</p>
            </div>
            <input
              type="date"
              required
              onChange={(e) => (
                setBYear(e.target.value.slice(0, 4)),
                setBMonth(e.target.value.slice(5, 7)),
                setBDay(e.target.value.slice(8, 10))
              )}
            />

            <div style={{ marginTop: "1rem" }} className="divPYear">
              <p>What is your gender?</p>
            </div>
            <div className="createRadio">
              <div class="radio-item">
                <input
                  id="radio-html"
                  type="radio"
                  name="radio-group"
                  value="Man"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label for="radio-html">Man</label>
              </div>
              <div class="radio-item">
                <input
                  id="radio-css"
                  type="radio"
                  name="radio-group"
                  value="Woman"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label for="radio-css">Woman</label>
              </div>

              <div class="radio-item">
                <input
                  id="radio-other"
                  type="radio"
                  name="radio-group"
                  value="Other"
                  onChange={(e) => setGender(e.target.value)}
                />
                <label for="radio-other">Other</label>
              </div>
            </div>

            <div className="btnCreateContainer">
              <button type="submit" className="btnSignUp">
                Sign up
              </button>

              <button
                type="submit"
                className="btnLoginCreate"
                onClick={onClick}
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
