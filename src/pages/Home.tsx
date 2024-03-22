import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import loginButton from "../global/assets/icons/login-button.svg";
import profileIcon from "../global/assets/icons/user-profile-icon.svg";
import adminIcon from "../global/assets/icons/admin-icon.svg";
import writeIcon from "../global/assets/icons/write-icon.svg";
import "./Home.css";
import { UserContext } from "../context/UserContext";
import ContactButton from "../components/ContactButton";
import exampleImage from "../global/assets/images/example.jpg";
import axios from "axios";

const Home = () => {
  const userCtx = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const data = await axios({
          url: `${process.env.REACT_APP_SERVER_URL}/api/v1/category`,
          method: "GET",
        });
        setCategories(data.data.result);
      } catch (error) {
        console.log(error);
      }
    };

    getCategoryList();
  }, []);
  useEffect(() => {});

  return (
    <React.Fragment>
      <div id="home">
        <div className="wrapper">
          <div className="main-title-wrapper">
            <span className="main-title">ルムネ スタジオ</span>
            <div className="button-wrapper">
              <span className="login-button">
                {!!userCtx.user?.email ? (
                  ""
                ) : (
                  <Link to="/login">
                    <img
                      className="login-button-icon"
                      src={loginButton}
                      alt=""
                    />
                  </Link>
                )}

                {!!userCtx.user?.email ? (
                  <Link to="/profile">
                    <img
                      className="user-profile-button-icon"
                      src={profileIcon}
                      alt=""
                    />
                  </Link>
                ) : (
                  ""
                )}
                {!!userCtx.user?.authorities?.find(
                  (auth) => auth.name === "ROLE_ADMIN"
                ) ? (
                  <React.Fragment>
                    <Link to="/admin/v1/dashboard">
                      <img
                        className="user-profile-button-icon"
                        src={adminIcon}
                        alt=""
                      />
                    </Link>
                    <Link to="/write">
                      <img
                        className="user-profile-button-icon"
                        src={writeIcon}
                        alt=""
                      />
                    </Link>
                  </React.Fragment>
                ) : (
                  ""
                )}
              </span>
            </div>
          </div>
          <div className="category">
            <ul className="category-list">
              <li>
                <Link to="product/all">전체 상품</Link>
              </li>
              <li>
                <Link to="product/season">시즌 상품</Link>
              </li>
              <li>
                <Link to="product/limit">한정 상품</Link>
              </li>
              {categories.map((e: any, idx) => {
                return (
                  <li key={idx}>
                    <Link to={`product/${e.englishName}`}>{e.name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="magazine-photo-area">
            <img className="magazine-photo" src={exampleImage} alt=""></img>
          </div>
        </div>
      </div>
      <ContactButton />
    </React.Fragment>
  );
};

export default Home;
