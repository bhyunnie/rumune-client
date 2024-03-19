import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const cookieUtil = {
  setCookie: (name: string, value: string, options: object) => {
    return cookies.set(name, value, { ...options });
  },

  getCookie: (name: string): string => {
    return cookies.get(name);
  },

  deleteCookie: (name: string) => {
    return cookies.remove(name);
  },

  getAccessTokenFromCookie: async (): Promise<string> => {
    const accessToken = cookies.get("access-token");
    const refreshToken = cookies.get("refresh-token");
    if (accessToken) {
      return accessToken;
    } else if (refreshToken) {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/jwt/refresh`,
        headers: {
          Authorization: `${refreshToken}`,
        },
        withCredentials: true,
      }).then((data) => {
        return cookieUtil.getCookie("access-token");
      });
      return "";
    } else {
      return "";
    }
  },
};

export default cookieUtil;
