import cookieUtil from "./cookieUtil";

const axiosUtil = {
  getBearerToken: (): string | undefined => {
    const accessToken = cookieUtil.getCookie("access-token");
    if (accessToken) {
      return `Bearer ${accessToken}`;
    } else {
      return undefined;
    }
  },

  getAccessToken: (): string => {
    return cookieUtil.getCookie("access-token");
  },
};

export default axiosUtil;
