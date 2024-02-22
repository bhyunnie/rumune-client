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
};

export default cookieUtil;
