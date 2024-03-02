import { useEffect, useState } from "react";
import CustomEditor from "../../components/editor/CustomEditor";
import "./Write.css";
import WriteProductInfo from "../../components/write/WriteProductInfo";
import strawBerry from "../../global/assets/images/strawberry-null.png";
import { Link } from "react-router-dom";
import axios from "axios";

export interface ProductInfo {
  name: string;
  price: number | null;
  discount: number | null;
  quantityLimit: number | null;
  deliveryFee: number | null;
}

const Write = () => {
  // TODO : step1이 끝나고 step2 필요
  const [data, setData] = useState();
  const [thumbnail, setThumbnail] = useState<
    String | ArrayBuffer | null | undefined
  >(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>();
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    name: "",
    price: null,
    discount: null,
    quantityLimit: null,
    deliveryFee: null,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(data);
  });

  const submitPost = () => {
    const body = new FormData();
    if (thumbnailFile) {
      body.append("file", thumbnailFile);
    }

    body.append("name", productInfo.name);
    body.append("price", productInfo.price);
    body.append("discount", productInfo.discount);
    body.append("name", productInfo.name);
    body.append("name", productInfo.name);

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/post/write`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: body,
    });
  };

  const checkNull = (p: ProductInfo) => {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
      }
    }
  };

  return (
    <div id="write">
      <div className="header">
        <Link to="/">
          <img className="logo" src={strawBerry} alt=""></img>
        </Link>
      </div>
      <div className="wrapper">
        <WriteProductInfo
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          setThumbnailFile={setThumbnailFile}
        />
        <CustomEditor setData={setData}></CustomEditor>
        <button onClick={submitPost}>상품 등록</button>
      </div>
    </div>
  );
};

export default Write;
