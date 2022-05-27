import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Header } from "./pages/header/header";
import { Login } from "./pages/login/login";
import { Profile } from "./pages/profile/profile";
import { PageNotFound } from "./pages/pageNotFound/PageNotFound";
import { Activate } from "./pages/home/activate";

export const PageRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/activate/:token" element={<Activate />}></Route>
        <Route exact path="/header" element={<Header />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
};
