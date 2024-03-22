import { useEffect, useState } from "react";
import CustomEditor from "../../components/editor/CustomEditor";
import "./Write.css";
import WriteProductInfo from "../../components/write/WriteProductInfo";
import strawBerry from "../../global/assets/images/strawberry-null.png";
import { Link } from "react-router-dom";
import axios from "axios";
import axiosUtil from "../../global/utils/axiosUtil";

export interface ProductInfo {
  title: string;
  price: number;
  discount: number;
  deliveryFee: number;
}

const Write = () => {
  const [data, setData] = useState("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    title: "",
    price: 0,
    discount: 0,
    deliveryFee: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(productInfo);
  });

  const submitPost = () => {
    const body = new FormData();
    if (thumbnail) {
      if (!checkNull(productInfo)) return;
      body.append("thumbnail", thumbnail);
      body.append("title", productInfo.title);
      body.append("content", data);
      body.append("discount", productInfo.discount.toString());
      body.append("deliveryFee", productInfo.deliveryFee.toString());
      body.append("domain", "product_post");
      selectedProductList.forEach((item: any) => {
        body.append("productIdList", item.id.toString());
        item.image.forEach((i: any) => {
          body.append("postImageURLList", i);
        });
      });
      requestApi(body);
    }
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

  const requestApi = async (body: FormData) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/admin/api/v1/post/product`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: await axiosUtil.getBearerToken(),
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

  const changeValue = (e: any) => {
    setProductInfo((prev: ProductInfo) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
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
        <input
          className="write-product-post-title"
          type="text"
          name="title"
          value={productInfo.title}
          onChange={changeValue}
          placeholder="제목을 입력하세요"
        ></input>
        <WriteProductInfo
          productInfo={productInfo}
          setProductInfo={setProductInfo}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          selectedProductList={selectedProductList}
          setSelectedProductList={setSelectedProductList}
        />
        <CustomEditor setData={setData}></CustomEditor>
        <button className="submit-button" onClick={submitPost}>
          상품 등록
        </button>
      </div>
    </div>
  );
};

export default Write;
