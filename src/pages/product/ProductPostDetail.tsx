import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import parse from "react-html-parser";

interface productDetail {
  title: string;
  createdBy: string;
  content: string;
}

const ProductPostDetail = () => {
  const [detail, setDetail] = useState<productDetail>({
    title: "",
    createdBy: "",
    content: "",
  });
  useEffect(() => {
    const getDetail = async () => {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/post/product/${
          window.location.pathname.split("/")[2]
        }`,
        headers: {
          Authorization: await axiosUtil.getBearerToken(),
        },
      });
      setDetail(response.data.result);
    };

    getDetail();
  }, []);
  useEffect(() => {
    console.log(detail);
    console.log(detail.content === "" ? "" : parse(detail.content));
  });
  return (
    <React.Fragment>
      <div>{detail.title}</div>
      <div>{detail.createdBy}</div>
      <div>{detail.content === "" ? "" : parse(detail.content)}</div>
    </React.Fragment>
  );
};

export default ProductPostDetail;
