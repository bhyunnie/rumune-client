import "./App.css";
import strawberry_null from "./global/assets/images/strawberry-null.png";
import strawberry_yellow from "./global/assets/images/strawberry-yellow.png";
import omurice from "./global/assets/images/omurice.png";
import menubutton from "./global/assets/icons/menu-button-black.svg";

function App() {
  return (
    <div id="App">
      <div className="wrapper">
        <img src={menubutton} alt="" className="menu-button"></img>
        <span className="main-title">ルムネ スタジオ</span>
        <div className="photo-area">
          <img src={omurice} alt="" className="first"></img>
          <div className="second"></div>
          <div className="third"></div>
          <img src={strawberry_yellow} alt="" className="fourth"></img>
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
    </div>
  );
}

export default App;
