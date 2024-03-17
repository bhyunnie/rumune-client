import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import "./AdminUser.css";
import AdminUserChart from "../../components/AdminUserChart";

type User = {
  userId: number;
  email: string;
  username: string;
  provider: string;
  createdAt: string;
  deprecated: boolean;
};

const AdminUser = () => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {});

  const getUserList = async () => {
    try {
      const bearerToken = await axiosUtil.getBearerToken();
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/user/list`,
        headers: {
          Authorization: bearerToken,
        },
      });
      setUserList(response.data.userList);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div id="admin-user">
        <AdminUserChart></AdminUserChart>
        <table className="user-table">
          <thead>
            <tr>
              <th>고유번호</th>
              <th>이메일</th>
              <th>이름</th>
              <th>가입경로</th>
              <th>가입일자</th>
              <th>차단여부</th>
            </tr>
          </thead>
          {userList.length > 0 ? (
            <tbody>
              {userList.map((e: User, idx) => {
                return (
                  <tr key={idx}>
                    <td className="user-id">{e.userId}</td>
                    <td className="email">{e.email}</td>
                    <td className="username">{e.username}</td>
                    <td className="provider">{e.provider}</td>
                    <td className="created-at">
                      {e.createdAt.slice(0, e.createdAt.indexOf("T"))}
                    </td>
                    <td className="deprecated">{e.deprecated ? "O" : "X"}</td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            ""
          )}

          <thead></thead>
        </table>
      </div>
    </React.Fragment>
  );
};

export default AdminUser;
