import { PageRoutes } from "./PageRoutes";
import React from "react";
import { Theme } from "./components/theme";
import "./index.css";
import { useSelector } from "react-redux";
import user from "./reducers/userReducer";

export const App = () => {
  const themes = useSelector((store) => store.user.theme);

  React.useEffect(() => {
    document.documentElement.className = themes;
    localStorage.setItem("themes", themes);
  }, [themes]);

  return (
    <div style={{width: '100vw', height: '100vh'}} body={themes}>
      <Theme />
      <PageRoutes />
    </div>
  );
};

export default App;
