import "./Login.css";
import lineIcon from "../global/assets/icons/line-oauth2-icon.png";
import kakaoIcon from "../global/assets/icons/kakao-oauth2-icon.png";
import googleIcon from "../global/assets/icons/google-oauth2-icon.svg";
import naverIcon from "../global/assets/icons/naver-oauth2-icon.png";

const Login = () => {
  return (
    <div id="login">
      <div className="wrapper">
        <header className="title">RUMUNE</header>
        <header className="subtitle">루무네 잡화점에 오신걸 환영합니다</header>
        <main className="content"></main>
        <div className="seperator">
          <div className="line"></div>
          <div> OR </div>
          <div className="line"></div>
        </div>
        <ul className="oauth-login-wrapper">
          <li className="oauth-login">
            <a href="http://localhost:8080/oauth2/authorization/naver">
              <img className="oauth-login-button" src={naverIcon} alt="" />
            </a>
          </li>
          <li className="oauth-login">
            <a href="http://localhost:8080/oauth2/authorization/google">
              <img className="oauth-login-button" src={googleIcon} alt="" />
            </a>
          </li>
          <li className="oauth-login">
            <a href="http://localhost:8080/oauth2/authorization/discord">
              <img className="oauth-login-button" src={lineIcon} alt="" />
            </a>
          </li>
          <li className="oauth-login">
            <a href="http://localhost:8080/oauth2/authorization/kakao">
              <img className="oauth-login-button" src={kakaoIcon} alt="" />
            </a>
          </li>
        </ul>
        <footer className="footer"></footer>
      </div>
    </div>
  );
};

export default Login;
