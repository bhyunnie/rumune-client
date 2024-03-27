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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<any>([]);

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

  const toggleOptionMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const selectProduct = (e: any) => {
    const clickedProductId = Number(e.currentTarget.dataset.productId);

    const targetProduct = detail.products.find(
      (product) => product.id === clickedProductId
    );

    const selectedProductIndex = selectedList.findIndex((el: any) => {
      return el.id === clickedProductId;
    });

    if (selectedProductIndex >= 0) {
      selectedList[selectedProductIndex].count += 1;
      setSelectedList(selectedList);
    } else {
      setSelectedList([...selectedList, { ...targetProduct, count: 1 }]);
    }

    // count 넣어야하니까 객체배열로 바꿔야된다. // 다른데 눌렀을때도 꺼지도록 해야한다
    setIsMenuOpen(!isMenuOpen);
  };

  const increaseProductCount = (e: any) => {
    const selectedProductIndex = selectedList.findIndex((el: any) => {
      return el.id === Number(e.target.dataset.id);
    });
    console.log(selectedProductIndex);
    selectedList[selectedProductIndex].count += 1;
    setSelectedList([...selectedList]);
  };

  const decreaseProductCount = (e: any) => {
    const selectedProductIndex = selectedList.findIndex((el: any) => {
      return el.id === Number(e.target.dataset.id);
    });
    selectedList[selectedProductIndex].count -= 1;
    console.log(selectedList);
    setSelectedList([...selectedList]);
  };

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
        <div className="product-post-info-wrapper">
          <img className="thumbnail" src={detail.thumbnailURL} alt=""></img>
          <div className="product-info">
            <div className="title">
              {detail.title}{" "}
              {dateUtil.isLastDay(detail.createdAt, 3)
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
            <div className="least-quantity">
              <strong>최소 구매수량</strong> 1 개
            </div>
            <div className="menu-wrapper">
              <span className="toggle-button" onClick={toggleOptionMenu}>
                옵션을 선택해주세요 (필수){" "}
              </span>
              <ul className={`product-list ${isMenuOpen ? "" : "closed"}`}>
                {detail.products?.map((e, idx) => {
                  return (
                    <li
                      key={idx}
                      className="product"
                      data-product-id={e.id}
                      data-max-stock={e.stock}
                      onClick={selectProduct}
                    >
                      <img
                        className="thumbnail"
                        src={e.image[0]?.image?.fileURL}
                        alt=""
                      ></img>
                      <div className="product-info-wrapper">
                        <div className="name-price">
                          <div className="name">{e.name}</div>
                          <div className="price">
                            {currencyUtil.addComma(e.price)} 원
                          </div>
                        </div>
                        <div className="stock">잔여 : {e.stock} 개</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <ul className="selected-product-list">
              {selectedList.map((product: any, idx: number) => {
                return (
                  <li className="selected-product-wrapper" key={idx}>
                    <div className="name">{product.name}</div>
                    <hr></hr>
                    <div className="count-sum-wrapper">
                      <div className="count-wrapper">
                        <button
                          className="count-plus-button"
                          data-id={product.id}
                          onClick={increaseProductCount}
                        >
                          +
                        </button>
                        <span className="count-display">{product.count}</span>
                        <button
                          className="count-minus-button"
                          data-id={product.id}
                          onClick={decreaseProductCount}
                        >
                          -
                        </button>
                      </div>
                      <div className="product-price-sum">
                        {currencyUtil.addComma(product.price * product.count)}{" "}
                        원
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            {selectedList.length > 0 ? (
              <div className="total">
                <span>
                  합계 (
                  {selectedList.reduce((acc: number, cur: any) => {
                    return acc + cur.count;
                  }, 0)}
                  개)
                </span>
                <span>
                  {currencyUtil.addComma(
                    selectedList.reduce((acc: number, cur: any) => {
                      return acc + cur.price * cur.count;
                    }, 0)
                  )}{" "}
                  원
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="buttons">
              <button className="purchase">구매하기</button>
              <button className="cart">장바구니</button>
              <button className="like">찜</button>
            </div>
          </div>
        </div>
        <div className="product-link"></div>
        <div className="product-content">
          {detail.content === "" ? "" : parse(detail.content)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductPostDetail;
