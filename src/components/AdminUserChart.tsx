import React, { useEffect, useState } from "react";
import "./AdminUserChart.css";
import axiosUtil from "../global/utils/axiosUtil";
import axios from "axios";
import StandardChart from "./StandardChart";
import { UserCountChart } from "../global/utils/typeUtil";

const AdminUserChart = () => {
  const [data, setData] = useState<UserCountChart[]>([]);

  useEffect(() => {
    getUserCountList();
  }, []);

  useEffect(() => {});

  const getUserCountList = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/user/count?date=20240225`,
        headers: {
          Authorization: axiosUtil.getBearerToken(),
        },
      });
      setData(
        response.data.responseData.map((e: UserCountChart) => {
          return {
            count: e.count,
            time: `${e.time.substring(6, 8)}일${e.time.substring(8, 10)}시`,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <div id="user-chart">
        <StandardChart data={data} type={"line"}></StandardChart>
      </div>
    </React.Fragment>
  );
};

export default AdminUserChart;
