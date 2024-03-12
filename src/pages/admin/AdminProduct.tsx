import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import { ModalContext } from "../../context/ModalContext";
import ProductRegistModal from "../../components/admin/product/ProductRegistModal";
import ProductCard from "../../components/admin/product/ProductCard";
import "./AdminProductList.css";
import "./AdminProduct.css";

export type Product = {
  categories: any[];
  createdAt: string;
  id: number;
  isDeleted: boolean;
  isNew: boolean;
  name: string;
  new: boolean;
  price: number;
  productImage: any[];
  quantityLimit: number;
  updatedAt: string;
};

const AdminProduct = () => {
  const modalCtx = useContext(ModalContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/admin/api/v1/product/all`,
      headers: {
        Authorization: axiosUtil.getBearerToken(),
      },
    })
      .then((data) => {
        console.log(data);
        setProductList(data.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {});

  const openProductRegistModal = () => {
    modalCtx.setModalList([
      ...modalCtx.modalList,
      <ProductRegistModal setProductList={setProductList} />,
    ]);
  };

  return (
    <React.Fragment>
      <div className="admin-page-title">🎁 상품관리</div>
      <div className="admin-product-regist-button-wrapper">
        <button
          className="admin-product-regist-button"
          onClick={openProductRegistModal}
        >
          상품 등록
        </button>
      </div>
      <div className="admin-product-list">
        {productList.map((e: Product, i) => {
          return <ProductCard key={i} product={e} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default AdminProduct;
