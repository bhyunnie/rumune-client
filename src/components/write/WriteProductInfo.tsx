import React, { useContext, useEffect, useRef } from "react";
import "./WriteProductInfo.css";
import { ProductInfo } from "../../pages/write/Write";
import { ModalContext } from "../../context/ModalContext";
import ProductListModal from "../admin/product/ProductListModal";
import ProductList from "../admin/product/ProductList";

const WriteProductInfo = (props: {
  productInfo: ProductInfo;
  setProductInfo: Function;
  thumbnail: File | undefined;
  setThumbnail: Function;
  selectedProductList: any;
  setSelectedProductList: Function;
}) => {
  const {
    productInfo,
    setProductInfo,
    thumbnail,
    setThumbnail,
    selectedProductList,
    setSelectedProductList,
  } = props;

  const modalCtx = useContext(ModalContext);

  const fileRef = useRef<HTMLInputElement>(null);
  const openFileBrowser = () => {
    fileRef.current?.click();
  };

  const changeValue = (e: any) => {
    setProductInfo((prev: ProductInfo) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {});

  const openProductListModal = () => {
    modalCtx.setModalList([
      ...modalCtx.modalList,
      <ProductListModal setSelectedProductList={setSelectedProductList} />,
    ]);
  };

  const changeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files: FileList = e.target.files;
    setThumbnail(files[0]);
  };

  return (
    <React.Fragment>
      <div id="write-product-info">
        <div className="wrapper">
          <div className="left">
            <div className="thumbnail-upload" onClick={openFileBrowser}>
              {thumbnail ? (
                <img
                  className="thumbnail"
                  src={
                    thumbnail
                      ? URL.createObjectURL(thumbnail)
                      : process.env.REACT_APP_DEFAULT_UPLOAD_IMAGE
                  }
                  alt=""
                ></img>
              ) : (
                <>
                  +<span className="thumbnail-text">썸네일 이미지 추가</span>
                </>
              )}
            </div>
            <input
              className="thumbnail-file"
              ref={fileRef}
              type="file"
              onChange={changeThumbnail}
            ></input>
          </div>
          <div className="right">
            <section className="section-wrapper">
              <label>할인율</label>
              <input
                name="discount"
                type="text"
                value={productInfo.discount || ""}
                onChange={changeValue}
                placeholder="할인율을 선택해주세요"
              ></input>
            </section>
            <section className="section-wrapper">
              <label>배송비</label>
              <input
                name="deliveryFee"
                type="text"
                value={productInfo.deliveryFee || ""}
                onChange={changeValue}
                placeholder="배송비를 입력해주세요"
              ></input>
            </section>
            <div className="section-wrapper">
              🎁 상품 목록 {`(${selectedProductList.length} / 10)`}{" "}
              <button onClick={openProductListModal}>상품 추가</button>
            </div>
            <div className="product-list-column">
              <span className="thumbnail">썸네일</span>
              <span className="name">상품명</span>
              <span className="price">가격</span>
              <span className="limit">제한개수</span>
              <span className="stock">재고</span>
            </div>
            <ProductList
              productList={selectedProductList}
              setSelectedProductList={setSelectedProductList}
            ></ProductList>
          </div>
        </div>
        <div className="button-wrapper"></div>
      </div>
    </React.Fragment>
  );
};

export default WriteProductInfo;
