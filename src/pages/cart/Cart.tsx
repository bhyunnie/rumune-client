import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import cookieUtil from "../../global/utils/cookieUtil";
import axios from "axios";
import axiosUtil from "../../global/utils/axiosUtil";

const Cart = () => {
  const userCtx = useContext(UserContext);
  const [productList, setProductList] = useState<any[]>([]);
  useEffect(() => {
    const cartProductListCookie = cookieUtil.getCookie("cart-product-list");
    const user = userCtx.user;

    const getCart = async () => {
      const result = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/cart`,
        headers: {
          Authorization: await axiosUtil.getBearerToken(),
        },
      });

      return result;
    };

    if (!!user.userId) {
      getCart();
    }
  }, [userCtx]);
  useEffect(() => {});
  return <div id="cart">카트입니다.</div>;
};

export default Cart;
