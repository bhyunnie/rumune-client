import axios from "axios";
import cookieUtil from "./cookieUtil";

const axiosUtil = {
  /**
   * @returns
   */
  getBearerToken: async () => {
    const accessToken = cookieUtil.getCookie("access-token");
    const refreshToken = cookieUtil.getCookie("refresh-token");

    if (accessToken) {
      return `Bearer ${accessToken}`;
    } else if (refreshToken) {
      await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/jwt/refresh`,
        headers: {
          Authorization: `${refreshToken}`,
        },
        withCredentials: true,
      })
        .then(() => {
          return cookieUtil.getCookie("access-token");
        })
        .catch(() => {
          return undefined;
        });
    } else {
      return undefined;
    }
  },

  getAccessToken: (): string => {
    return cookieUtil.getCookie("access-token");
  },
};

export default axiosUtil;
