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
import { useContext, useEffect } from "react";
import cookieUtil from "./global/utils/cookieUtil";
import axios from "axios";
import { UserContext } from "./context/UserContext";
import Admin from "./pages/Admin";

const App = () => {
  const userCtx = useContext(UserContext);
  useEffect(() => {
    setUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @description 로그인 유지를 위한 유저 정보 초기 설정 ( access-token 기반으로 userContext 정보 갱신 )
   */
  const setUserInfo = () => {
    const accessToken = cookieUtil.getCookie("access-token");
    if (accessToken) {
      const bearerToken = accessToken ? `Bearer ${accessToken}` : null;
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
          console.log(error);
        });
    } else {
      userCtx.setUser({});
    }
  };

  return (
    <CookiesProvider>
      <BrowserRouter>
        <div id="App">
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
          </Routes>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
};

export default App;
