import React, { useEffect } from "react";
import { Product } from "../../../pages/admin/AdminProduct";
import "./ProductList.css";

const ProductList = (props: {
  productList: Product[];
  setSelectedProductList: Function;
}) => {
  const deleteProduct = (e: any) => {
    props.setSelectedProductList(
      props.productList.filter((_, idx) => idx !== Number(e.target.dataset.id))
    );
  };
  useEffect(() => {});
  return (
    <React.Fragment>
      <div className="regist-product-list">
        {props.productList.map((e, idx) => {
          return (
            <React.Fragment key={idx}>
              <div className="product-list-wrapper">
                <img
                  className="product-list-thumbnail"
                  src={e.thumbnail}
                  alt=""
                  width={50}
                  height={50}
                ></img>
                <div className="product-list-name">{e.name}</div>
                <div className="product-list-price">{e.price} 원</div>
                <div className="product-list-quantity-limit">
                  {e.quantityLimit} 개
                </div>
                <div className="product-list-stock">{e.stock} 개</div>
                <button
                  className="product-list-delete"
                  data-id={idx}
                  onClick={deleteProduct}
                >
                  x
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default ProductList;
