import React, { useEffect, useRef, useState } from "react";
import strawberry_null from "../global/assets/images/strawberry-null.png";
import instagramLogo from "../global/assets/icons/instagram.svg";
import lineLogo from "../global/assets/icons/line.svg";
import twitterLogo from "../global/assets/icons/twitter.svg";
import youtubeLogo from "../global/assets/icons/youtube.svg";

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menus = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (isOpen) {
      menus.current?.classList.add("open");
    } else {
      menus.current?.classList.remove("open");
    }
  }, [isOpen]);
  return (
    <React.Fragment>
      <div className="contact-button">
        <ul className="contact-menu-wrapper" ref={menus}>
          <li>
            <a
              href="https://line.me/ko/"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <img className="contact-menu" src={lineLogo} alt="" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/rihuirin/"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <img className="contact-menu" src={instagramLogo} alt="" />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <img className="contact-menu" src={twitterLogo} alt="" />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noreferrer"
            >
              <img className="contact-menu" src={youtubeLogo} alt="" />
            </a>
          </li>
        </ul>
        <img
          onClick={() => setIsOpen(!isOpen)}
          className="contact-button-image"
          src={strawberry_null}
          alt=""
        ></img>
        <span className="contact-button-text">방가방가</span>
      </div>
    </React.Fragment>
  );
};

export default ContactButton;
