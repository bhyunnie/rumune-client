import { useEffect, useState } from "react";
import CustomEditor from "../../components/editor/CustomEditor";
import "./Write.css";
import WriteProductInfo from "../../components/write/WriteProductInfo";
import strawBerry from "../../global/assets/images/strawberry-null.png";
import { Link } from "react-router-dom";
import axios from "axios";

export interface ProductInfo {
  title: string;
  price: number | null;
  discount: number | null;
  deliveryFee: number | null;
}

const Write = () => {
  // TODO : step1이 끝나고 step2 필요
  const [data, setData] = useState("");
  const [thumbnail, setThumbnail] = useState<
    String | ArrayBuffer | null | undefined
  >(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>();
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    title: "",
    price: null,
    discount: null,
    deliveryFee: null,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  const submitPost = () => {
    const body = new FormData();
    if (thumbnailFile) {
      body.append("file", thumbnailFile);
    }
    checkNull(productInfo);
    appendBody(body, productInfo);
    requestApi(body);
  };

  const checkNull = (p: ProductInfo): boolean => {
    if (data === "") {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, value] of Object.entries(p)) {
      if (value === null) {
        return false;
      }
    }
    return true;
  };

  const appendBody = (body: FormData, productInfo: ProductInfo) => {
    for (const [key, value] of Object.entries(productInfo)) {
      body.append(key, value);
    }
    body.append("title", productInfo.title);
    body.append("content", data);
    body.append("domain", "PRODUCT_POST");
  };

  const requestApi = (body: FormData) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/product/post/write`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: body,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        <CustomEditor
          setData={setData}
          submitButtonClick={submitPost}
        ></CustomEditor>
      </div>
    </div>
  );
};

export default Write;
