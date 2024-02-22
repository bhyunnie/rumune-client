import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import "./AdminUser.css";

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
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/user/list`,
      headers: {
        Authorization: axiosUtil.getBearerToken(),
      },
    })
      .then((data) => {
        setUserList(data.data?.userList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    console.log(userList);
  });
  return (
    <React.Fragment>
      <div id="admin-user">
        <div>사용자 현황</div>
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
