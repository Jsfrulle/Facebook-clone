import React, { useState } from "react";
import theme from "./theme.css";
import user from "../reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";

export const Theme = () => {
  const theme = useSelector((store) => store.user.theme);
  const [color, setColor] = useState(theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (color === "light-theme") {
      dispatch(user.actions.setTheme("dark-theme"));
      setColor("dark-theme");
    } else {
      dispatch(user.actions.setTheme("light-theme"));
      setColor("light-theme");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        background: "transparent",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        alignContent: "flex-end",
        width: "100%"
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "1%",
          background: "transparent"
        }}
      >
        <input className="l" type="checkbox" onClick={toggleTheme} />
      </div>
    </div>
  );
};
