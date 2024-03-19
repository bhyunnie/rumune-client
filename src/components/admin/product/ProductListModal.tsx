import React, { useContext, useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import axios from "axios";
import axiosUtil from "../../../global/utils/axiosUtil";
import "./ProductListModal.css";
import ProductCard from "./ProductCard";
import { ModalContext } from "../../../context/ModalContext";

const ProductListModal = (props: { setSelectedProductList: Function }) => {
  const [productList, setProductList] = useState([]);
  const modalCtx = useContext(ModalContext);
  useEffect(() => {});
  useEffect(() => {}, []);

  const getProductList = async () => {
    axios({
      url: `${process.env.REACT_APP_SERVER_URL}/admin/api/v1/product/all`,
      method: "GET",
      headers: {
        Authorization: await axiosUtil.getBearerToken(),
      },
    })
      .then((data) => {
        setProductList(data.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const productCardClick = (e: any) => {
    const productCard = e.target.closest(".product-card");
    props.setSelectedProductList((prev: any) => {
      return [
        ...prev,
        productList.find((e: any) => e.id === Number(productCard.dataset.id)),
      ];
    });
    modalCtx.setModalList(modalCtx.modalList.slice(0, -1));
  };

  if (productList.length === 0) getProductList();
  return (
    <Modal>
      <div id="product-list-modal">
        {productList.map((e: any, idx) => {
          return (
            <React.Fragment key={idx}>
              <ProductCard
                product={{
                  id: e.id,
                  name: e.name,
                  price: e.price,
                  categories: e.category,
                  thumbnail: e.thumbnail,
                  image: e.image,
                  quantityLimit: e.quantityLimit,
                  createdAt: e.createdAt,
                  stock: e.stock,
                }}
                productCardClick={productCardClick}
              ></ProductCard>
            </React.Fragment>
          );
        })}
      </div>
    </Modal>
  );
};

export default ProductListModal;
