import React from "react";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  return (
    <React.Fragment>
      <div>
        <Link to="/write">상품 등록</Link>
      </div>
    </React.Fragment>
  );
};

export default AdminProducts;
