import React, { useEffect, useRef } from "react";
import "./WriteProductInfo.css";
import { ProductInfo } from "../../pages/write/Write";

const WriteProductInfo = (props: {
  productInfo: ProductInfo;
  setProductInfo: Function;
  thumbnail: String | ArrayBuffer | null | undefined;
  setThumbnail: Function;
  setThumbnailFile: Function;
}) => {
  const {
    productInfo,
    setProductInfo,
    thumbnail,
    setThumbnail,
    setThumbnailFile,
  } = props;

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

  return (
    <React.Fragment>
      <div id="write-product-info">
        <div className="wrapper">
          <div className="left">
            <div className="thumbnail-upload" onClick={openFileBrowser}>
              {thumbnail ? (
                <img
                  className="thumbnail"
                  src={thumbnail as string}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const reader = new FileReader();
                const files = event.target.files;
                if (files && files[0]) {
                  const file = files[0];
                  setThumbnailFile(file);
                  reader.onload = (e) => {
                    setThumbnail(e.target?.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            ></input>
          </div>
          <div className="right">
            <section className="section-wrapper">
              <label>상품명</label>
              <input
                name="title"
                type="text"
                value={productInfo.title}
                onChange={changeValue}
                placeholder="상품명을 입력해주세요"
              ></input>
            </section>
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
            <section className="section-wrapper">
              <label>상품</label>
              <button>상품 추가</button>
            </section>
            <div>목록</div>
          </div>
        </div>
        <div className="button-wrapper"></div>
      </div>
    </React.Fragment>
  );
};

export default WriteProductInfo;
