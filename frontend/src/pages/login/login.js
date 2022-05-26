import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import styles from "./style.css";
import { SignIn } from "./signIn";
import { Create } from "./create";

export const Login = () => {
  const [mode, setMode] = useState(true);
  const modes = useSelector((store) => store.user.mode);

  useEffect(() => {
    setMode(modes);
  }, [modes]);

  return (
    <div >
      {mode ? (
       
          <SignIn />
       
      ) : (
       
          <Create />
        
      )}
    </div>
  );
};
