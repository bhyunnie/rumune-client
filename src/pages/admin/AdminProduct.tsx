import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import ProductRegistModal from "../../components/admin/product/ProductRegistModal";

const AdminProduct = () => {
  const [registModalOpen, setRegistModalOpen] = useState<boolean>(false);
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
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const toggleProductRegistModal = () => {
    console.log(registModalOpen);
    setRegistModalOpen(!registModalOpen);
  };

  return (
    <React.Fragment>
      {registModalOpen ? (
        <ProductRegistModal>
          <div></div>
        </ProductRegistModal>
      ) : (
        ""
      )}
      <div>
        <div>상품관리</div>
        <div>
          <button onClick={toggleProductRegistModal}>상품 등록</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminProduct;
