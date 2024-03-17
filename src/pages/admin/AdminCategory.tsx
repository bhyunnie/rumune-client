import axios from "axios";
import { useEffect, useState } from "react";
import axiosUtil from "../../global/utils/axiosUtil";
import { useNavigate } from "react-router-dom";

type Category = {
  id: number;
  name: string;
};

const AdminCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {}, []);
  useEffect(() => {});

  const changeData = (event: any) => {
    setData(event.target.value);
  };

  const checkAuthority = async () => {
    const bearerToken = await axiosUtil.getBearerToken();
    if (bearerToken) {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_SERVER_URL}/api/v1/admin/check/authority`,
        headers: {
          Authorization: bearerToken,
        },
      })
        .then((data) => {
          if (data.data.checked !== true) navigate("/");
        })
        .catch((e) => {
          navigate("/");
        });
    } else {
      navigate("/");
    }
  };

  checkAuthority();

  const addCategory = async (categoryName: string) => {
    const bearerToken = await axiosUtil.getBearerToken();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/admin/api/v1/category?categoryName=${categoryName}`,
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((_) => {
        const max = categories.reduce((acc, cur) => {
          return acc > cur.id ? acc : cur.id;
        }, 0);
        setCategories((prev) => {
          return [...prev, { id: max + 1, name: categoryName }];
        });
        setData("");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {categories.map((e, index) => (
        <div key={index}>{e.name}</div>
      ))}
      <input
        type="text"
        placeholder="카테고리를 입력해주세요."
        value={data}
        onChange={changeData}
      ></input>
      <button
        onClick={() => {
          addCategory(data);
        }}
      >
        카테고리 추가
      </button>
    </div>
  );
};

export default AdminCategory;
