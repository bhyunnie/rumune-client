import axios from "axios";
import { useEffect } from "react";
import cookieUtil from "../global/utils/cookieUtil";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminUser from "./admin/AdminUser";
import AdminGoods from "../components/admin/AdminGoods";

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkAuthority();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuthority = () => {
    const accessToken = cookieUtil.getCookie("access-token");
    if (accessToken) {
      const bearerToken = accessToken ? `Bearer ${accessToken}` : null;
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/check/authority`,
        headers: {
          Authorization: bearerToken,
        },
      })
        .then((data) => {
          if (data.data.checked !== true) navigate("/");
        })
        .catch((e) => {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  };
  return (
    <div id="admin">
      <div className="wrapper">
        <aside className="side-menu">
          <header>관리자 페이지</header>
          <ul className="menu-wrapper">
            <li className="menu">
              <Link to="/">홈</Link>
            </li>
            <li className="menu">
              <Link to="/admin/v1/dashboard">대시보드</Link>
            </li>
            <li className="menu">
              <Link to="/admin/v1/user">사용자 관리</Link>
            </li>
            <li className="menu">
              <Link to="/admin/v1/goods">상품 관리</Link>
            </li>
            <li className="menu">
              <Link to="/admin/v1/statistics">접속 통계</Link>
            </li>
            <li className="menu">
              <Link to="/admin/v1/notice">공지 관리</Link>
            </li>
            <li className="menu">
              <Link to="/admin/v1/calculate">정산</Link>
            </li>
          </ul>
        </aside>
        <div className="content">
          <Routes>
            <Route path="/dashboard/*" element={<div>dashboard</div>}></Route>
            <Route path="/user" element={<AdminUser />}></Route>
            <Route
              path="/goods/*"
              element={
                <div>
                  <AdminGoods />
                </div>
              }
            ></Route>
            <Route path="/statistics/*" element={<div>dashboard</div>}></Route>
            <Route path="/notice/*" element={<div>dashboard</div>}></Route>
            <Route path="/calculate/*" element={<div>dashboard</div>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
