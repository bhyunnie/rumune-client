import axios from "axios";
import { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";

const ProductPost = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    try {
      const getProduct = async () => {
        const data = await axios({
          method: "GET",
          url: `${process.env.REACT_APP_SERVER_URL}/api/v1/post/product`,
          headers: {
            Authorization: await axiosUtil.getBearerToken(),
          },
        });

        console.log(data);
        setProductList(data.data.result || []);
      };

      getProduct();
    } catch (error) {}
  }, []);
  return (
    <div>
      {productList.map((e: any, idx) => {
        return <div>게시글</div>;
      })}
    </div>
  );
};

export default ProductPost;
