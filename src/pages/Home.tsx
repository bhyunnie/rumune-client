import React, { useContext, useEffect, useRef, useState } from "react";
// import goodPicture from "../global/assets/images/good-picture.jpg";
// import japanCat from "../global/assets/images/japan-cat.jpg";
// import japanStreet from "../global/assets/images/japan-street.jpg";
import menuButton from "../global/assets/icons/menu-button-black.svg";
import { Link } from "react-router-dom";
import loginButton from "../global/assets/icons/login-button.svg";
import profileIcon from "../global/assets/icons/user-profile-icon.svg";
import adminIcon from "../global/assets/icons/admin-icon.svg";
import "./Home.css";
import { UserContext } from "../context/UserContext";
import ContactButton from "../components/ContactButton";
import exampleImage from "../global/assets/images/example.jpg";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenu = useRef<HTMLDivElement>(null);
  const dimmedArea = useRef<HTMLDivElement>(null);

  // let magazineInterval: NodeJS.Timer | undefined;
  useEffect(() => {});
  const userCtx = useContext(UserContext);

  // const toggleMenu = () => {
  //   if (isMenuOpen) {
  //     sideMenu.current?.classList.add("open");
  //     dimmedArea.current?.classList.add("on");
  //   } else {
  //     sideMenu.current?.classList.remove("open");
  //     dimmedArea.current?.classList.remove("on");
  //   }
  // };

  // const removeInterval = () => {
  //   clearInterval(magazineInterval);
  //   magazineInterval = undefined;
  // };

  useEffect(() => {
    // toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   magazineInterval = setInterval(() => {
  //     setMagazinePicture((prev) => (prev + 1) % magazinePictureArray.length);
  //   }, magazinePictureChangeInterval);
  //   return () => {
  //     removeInterval();
  //   };
  // }, []);

  useEffect(() => {
    const a = userCtx.user.authorities?.find((e) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      return e.name === "ROLE_ADMIN";
    });

    console.log(a);
  }, [userCtx]);

  // const magazinePictureArray = [goodPicture, japanCat, japanStreet];

  const clickDimmedArea = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <React.Fragment>
      <div
        className="dimmed-area"
        onClick={clickDimmedArea}
        ref={dimmedArea}
      ></div>
      <div id="home">
        <div className="wrapper">
          <div className="side-menu" ref={sideMenu}>
            <div className="menu-button-wrapper">
              <img
                src={menuButton}
                alt=""
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="menu-button"
              ></img>
            </div>
            <ul className="menu-wrapper">
              <li className="menu">
                <Link className="link" to="/shop">
                  🍒 전체상품
                </Link>
              </li>
              <li className="menu">
                <Link to="/shop?new">🐹 신상품</Link>
              </li>
              <li className="menu">🍄 인기상품</li>
              <li className="menu">🍓 스티커</li>
              <li className="menu">🍎 메모지</li>
            </ul>
          </div>
          <img
            src={menuButton}
            alt=""
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            className="menu-button"
          ></img>
          <div className="main-title-wrapper">
            <span className="main-title">ルムネ スタジオ</span>
            <span className="login-button">
              {!!userCtx.user?.email ? (
                ""
              ) : (
                <Link to="/login">
                  <img className="login-button-icon" src={loginButton} alt="" />
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
                <Link to="/admin/v1/dashboard">
                  <img
                    className="user-profile-button-icon"
                    src={adminIcon}
                    alt=""
                  />
                </Link>
              ) : (
                ""
              )}
            </span>
          </div>
          {/* <div className="photo-area">
        <img src={omurice} alt="" className="first"></img>
        <div className="second"></div>
        <div className="third"></div>
        <img
          src={strawberry_yellow}
          alt=""
          className="fourth"
        ></img>
        <div className="fifth"></div>
      </div> */}
          <div className="category">
            <ul className="category-list">
              <li>전체 상품</li>
              <li>시즌 상품</li>
              <li>한정 상품</li>
              <li>스티커</li>
              <li>메모지</li>
              <li>마스킹 테이프</li>
              <li>키링</li>
            </ul>
          </div>
          <div className="magazine-photo-area">
            <img
              className="magazine-photo"
              // src={magazinePictureArray[magazinePicture]}
              src={exampleImage}
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <ContactButton />
    </React.Fragment>
  );
};

export default Home;
