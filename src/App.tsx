import "./App.css";
// import strawberry_yellow from "./global/assets/images/strawberry-yellow.png";
// import omurice from "./global/assets/images/omurice.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { CookiesProvider } from "react-cookie";
import Profile from "./pages/Profile";
import LoginFailure from "./pages/LoginFailure";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import Admin from "./pages/Admin";
import Write from "./pages/write/Write";
import { CSSTransition } from "react-transition-group";
import "./transition/Fade.css";
import { ModalContext } from "./context/ModalContext";
import axiosUtil from "./global/utils/axiosUtil";
import ProductPostList from "./pages/product/ProductPostList";
import ProductPostDetail from "./pages/product/ProductPostDetail";

const App = () => {
  const userCtx = useContext(UserContext);
  const modalCtx = useContext(ModalContext);

  useEffect(() => {
    const setUserInfo = async () => {
      const bearerToken = await axiosUtil.getBearerToken();
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/user/me`,
        headers: {
          Authorization: bearerToken,
        },
      })
        .then((data) => {
          userCtx.setUser(data.data.userList[0]);
        })
        .catch((error) => {
          userCtx.setUser({});
        });
    };

    setUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {});

  return (
    <CookiesProvider>
      <BrowserRouter>
        <div id="App">
          <CSSTransition
            in={modalCtx.modalList.length > 0}
            timeout={{
              enter: 300,
              exit: 0,
            }}
            classNames="fade"
            unmountOnExit
          >
            <React.Fragment>
              <div className={`dimmed-area`}></div>
              {modalCtx.modalList.map((e, index) => {
                return <React.Fragment key={index}>{e}</React.Fragment>;
              })}
            </React.Fragment>
          </CSSTransition>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/shop" element={<Shop />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/login/oauth2/failure/*"
              element={<LoginFailure />}
            ></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/admin/v1/*" element={<Admin />}></Route>
            <Route path="/write/*" element={<Write></Write>}></Route>
            <Route path="/product/all" element={<ProductPostList />}></Route>
            <Route path="/product/*" element={<ProductPostDetail />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
};

export default App;
