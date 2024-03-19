import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import { ModalContext } from "../../context/ModalContext";
import ProductRegistModal from "../../components/admin/product/ProductRegistModal";
import ProductCard from "../../components/admin/product/ProductCard";
import "./AdminProductList.css";
import "./AdminProduct.css";
// import { useNavigate } from "react-router-dom";

export type Product = {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  image: string[];
  categories: string[];
  quantityLimit: number;
  createdAt: string;
  stock: number;
};

const AdminProduct = () => {
  const modalCtx = useContext(ModalContext);
  const [productList, setProductList] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const checkAuthority = async () => {
      const bearerToken = await axiosUtil.getBearerToken();
      if (bearerToken) {
        axios({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/check/authority`,
          headers: {
            Authorization: bearerToken,
          },
        })
          .then(async (data) => {
            if (data.data.checked !== true) window.location.replace("/");
            axios({
              method: "GET",
              url: `${process.env.REACT_APP_SERVER_URL}/admin/api/v1/product/all`,
              headers: {
                Authorization: await axiosUtil.getBearerToken(),
              },
            }).then((data: any) => {
              setProductList(data.data.result);
            });
          })
          .catch((e) => {
            window.location.replace("/");
          });
      } else {
        window.location.replace("/");
      }
    };

    checkAuthority();
  }, []);
  useEffect(() => {});

  const openProductRegistModal = () => {
    modalCtx.setModalList([
      ...modalCtx.modalList,
      <ProductRegistModal setProductList={setProductList} />,
    ]);
  };

  const productCardClick = () => {};

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
          return (
            <ProductCard
              key={i}
              product={e}
              productCardClick={productCardClick}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default AdminProduct;
