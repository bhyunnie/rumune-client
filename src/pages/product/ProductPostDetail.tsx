import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import parse from "react-html-parser";
import "./ProductPostDetail.css";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import dateUtil from "../../global/utils/dateUtil";
import currencyUtil from "../../global/utils/currencyUtil";

interface productDetail {
  title: string;
  createdBy: string;
  content: string;
  uuid: string;
  thumbnailURL: string;
  createdAt: string;
  price: number;
  products: any[];
  deliveryFee: number;
}

const ProductPostDetail = () => {
  const [detail, setDetail] = useState<productDetail>({
    title: "",
    createdBy: "",
    content: "",
    uuid: "",
    thumbnailURL: "",
    createdAt: "",
    price: 0,
    products: [],
    deliveryFee: 0,
  });

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/api/v1/post/product/${
            window.location.pathname.split("/")[3]
          }`,
          headers: {
            Authorization: await axiosUtil.getBearerToken(),
          },
        });
        setDetail(response.data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, []);

  useEffect(() => {});

  return (
    <React.Fragment>
      <div id="product-post-detail">
        <Breadcrumb
          crumbs={[
            { name: "Home", link: "/" },
            { name: "All", link: "/product/all" },
            { name: detail.title, link: `/product/detail/${detail.uuid}` },
          ]}
        ></Breadcrumb>
        <div className="product-info-wrapper">
          <img className="thumbnail" src={detail.thumbnailURL} alt=""></img>
          <div className="product-info">
            <div className="title">
              {detail.title}{" "}
              {dateUtil.isLastDay(detail.createdAt, 7)
                ? "신규상품딱지 추가필요"
                : ""}
            </div>
            <div className="price">
              {currencyUtil.addComma(detail.products[0]?.price)} 원
            </div>
            <hr></hr>
            <div className="deliveryfee">
              <strong>배송비</strong>
              {currencyUtil.addComma(detail.deliveryFee)} 원
            </div>
            <div className="least-purchase">
              <strong>최소 구매수량</strong> 1 개
            </div>
            <div className="option-toggle-button">옵션을 선택해주세요.</div>
            <ul className="product-list">
              {detail.products?.map((e, idx) => {
                return (
                  <li key={idx} className="product">
                    <div className="product-wrapper">
                      <img src={e.image[0].fileURL} alt=""></img>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>{detail.content === "" ? "" : parse(detail.content)}</div>
      </div>
    </React.Fragment>
  );
};

export default ProductPostDetail;
