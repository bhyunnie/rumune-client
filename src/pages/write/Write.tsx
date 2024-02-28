// import { useState } from "react";
import CustomEditor from "../../components/editor/CustomEditor";
import "./Write.css";

const Write = () => {
  // const [data, setData] = useState();
  return (
    <div id="write">
      <div className="header-container">
        <div>RUMUNE</div>
      </div>
      <div className="post-info-container">
        <div>상품등록</div>
        <div>
          <span>상품명</span>
          <input type="text"></input>
        </div>
        <div>
          <span>설명</span>
          <input type="text"></input>
        </div>
      </div>
      <div className="editor-container">
        <CustomEditor></CustomEditor>
      </div>
    </div>
  );
};

export default Write;
