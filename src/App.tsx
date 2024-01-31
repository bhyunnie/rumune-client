import "./App.css";
import strawberry_null from "./global/assets/images/strawberry-null.png";
import strawberry_yellow from "./global/assets/images/strawberry-yellow.png";
import omurice from "./global/assets/images/omurice.png";
import menubutton from "./global/assets/icons/menu-button-black.svg";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenu = useRef<HTMLDivElement>(null);
  const dimmedArea = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    if (isMenuOpen) {
      sideMenu.current?.classList.add("open");
      dimmedArea.current?.classList.add("on");
    } else {
      sideMenu.current?.classList.remove("open");
      dimmedArea.current?.classList.remove("on");
    }
  };

  const clickDimmedArea = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    toggleMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  return (
    <BrowserRouter>
      <div id="App">
        <Routes>
          {/* <Route path="/" element={<Shop />}></Route> */}
          <Route
            path="/"
            element={
              <React.Fragment>
                <div
                  className="dimmed-area"
                  onClick={clickDimmedArea}
                  ref={dimmedArea}
                ></div>
                <div className="wrapper">
                  <div className="side-menu" ref={sideMenu}>
                    <div className="menu-button-wrapper">
                      <img
                        src={menubutton}
                        alt=""
                        onClick={() => {
                          setIsMenuOpen(!isMenuOpen);
                        }}
                        className="menu-button"
                      ></img>
                    </div>
                    <ul className="menu-wrapper">
                      <li className="menu">🐹 신상품</li>
                      <li className="menu">🍄 인기상품</li>
                      <li className="menu">🍒 전체상품</li>
                      <li className="menu">🍓 스티커</li>
                      <li className="menu">🍎 메모지</li>
                    </ul>
                  </div>
                  <img
                    src={menubutton}
                    alt=""
                    onClick={() => {
                      setIsMenuOpen(!isMenuOpen);
                    }}
                    className="menu-button"
                  ></img>
                  <span className="main-title">ルムネ スタジオ</span>
                  <div className="photo-area">
                    <img src={omurice} alt="" className="first"></img>
                    <div className="second"></div>
                    <div className="third"></div>
                    <img
                      src={strawberry_yellow}
                      alt=""
                      className="fourth"
                    ></img>
                    <div className="fifth"></div>
                  </div>
                </div>
                <div className="contact-button">
                  <img
                    className="contact-button-image"
                    src={strawberry_null}
                    alt=""
                  ></img>
                  <span className="contact-button-text">방가방가</span>
                </div>
              </React.Fragment>
            }
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
