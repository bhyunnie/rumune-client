import React, { useEffect, useRef, useState } from "react";
import goodPicture from "../global/assets/images/good-picture.jpg";
import japanCat from "../global/assets/images/japan-cat.jpg";
import japanStreet from "../global/assets/images/japan-street.jpg";
import menuButton from "../global/assets/icons/menu-button-black.svg";
import { Link } from "react-router-dom";
import loginButton from "../global/assets/icons/login-button.svg";
import "./Home.css";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenu = useRef<HTMLDivElement>(null);
  const dimmedArea = useRef<HTMLDivElement>(null);
  let magazineInterval: NodeJS.Timer | undefined;

  const toggleMenu = () => {
    if (isMenuOpen) {
      sideMenu.current?.classList.add("open");
      dimmedArea.current?.classList.add("on");
    } else {
      sideMenu.current?.classList.remove("open");
      dimmedArea.current?.classList.remove("on");
    }
  };

  const removeInterval = () => {
    clearInterval(magazineInterval);
    magazineInterval = undefined;
  };

  useEffect(() => {
    toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    magazineInterval = setInterval(() => {
      setMagazinePicture((prev) => (prev + 1) % magazinePictureArray.length);
    }, magazinePictureChangeInterval);
    return () => {
      removeInterval();
    };
  }, []);

  const magazinePictureArray = [goodPicture, japanCat, japanStreet];
  const magazinePictureChangeInterval = 1000;
  const [magazinePicture, setMagazinePicture] = useState(0);

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
              <Link to="/login">
                <img className="login-button-icon" src={loginButton} alt="" />
              </Link>
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

          <div className="magazine-photo-area">
            <img
              className="magazine-photo"
              src={magazinePictureArray[magazinePicture]}
              alt=""
            ></img>
          </div>

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
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
