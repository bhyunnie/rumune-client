import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import "./ProductPostList.css";
import { Link } from "react-router-dom";

const ProductPostList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/api/v1/post/product`,
          headers: {
            Authorization: await axiosUtil.getBearerToken(),
          },
        });
        setProductList(data.data.result || []);
      } catch (error) {}
    };
    getProduct();
  }, []);

  return (
    <div className="product-post-list">
      {productList.map((e: any, idx) => {
        return (
          <React.Fragment key={idx}>
            <Link to={`/product/detail/${e.uuid}`}>
              <div className="product-post-card">
                <img
                  className="product-post-thumbnail"
                  src={e.thumbnailURL}
                  alt=""
                ></img>
                <div className="product-post-title">{e.title}</div>
                <div className="product-post-price">
                  {e.products[0].price}원
                </div>
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProductPostList;
