import React, { useEffect, useRef, useState } from "react";
import goodPicture from "../global/assets/images/good-picture.jpg";
import japanCat from "../global/assets/images/japan-cat.jpg";
import japanStreet from "../global/assets/images/japan-street.jpg";
import menubutton from "../global/assets/icons/menu-button-black.svg";
import { Link } from "react-router-dom";

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
            <li className="menu">
              <Link to="/shop">🐹 신상품</Link>
            </li>
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
      </div>
    </React.Fragment>
  );
};

export default Home;
