import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../../modal/Modal";
import "./ProductRegistModal.css";
import axios from "axios";
import axiosUtil from "../../../global/utils/axiosUtil";
import { ModalContext } from "../../../context/ModalContext";

type InputValue = {
  categoryId: number;
  quantityLimit: number;
  name: String;
  price: number;
};

const ProductRegistModal = (props: { setProductList: Function }) => {
  const modalCtx = useContext(ModalContext);
  const [thumbnail, setThumbnail] = useState<File>();
  const [imageArray, setImageArray] = useState<File[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<InputValue>({
    name: "",
    categoryId: 0,
    quantityLimit: 0,
    price: 0,
  });
  const addSubImageInput = useRef<HTMLInputElement>(null);
  const addThumbnailInput = useRef<HTMLInputElement>(null);

  const changeSubImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files: FileList = e.target.files;
    setImageArray(Array.from(files).slice(0, 4));
  };

  const changeThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files: FileList = e.target.files;
    setThumbnail(files[0]);
  };

  const getCategory = () => {
    axios({
      url: `${process.env.REACT_APP_SERVER_URL}/api/v1/category`,
      method: "GET",
    })
      .then((response) => {
        setCategories(response.data.result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const changeInputValue = (e: any) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {});
  useEffect(() => {
    getCategory();
  }, []);

  const submitCreateProduct = async () => {
    const data = new FormData();
    if (thumbnail) data.append("files", thumbnail);
    imageArray.forEach((file) => {
      data.append("files", file);
    });
    for (const [key, value] of Object.entries(inputValue)) {
      data.append(key, value.toString());
    }

    const bearerToken = await axiosUtil.getBearerToken();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_SERVER_URL}/admin/api/v1/product`,
      headers: {
        Authorization: bearerToken,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    })
      .then((data) => {
        props.setProductList((prev: any) => {
          return [...prev, data.data.result[0]];
        });
        modalCtx.setModalList(
          modalCtx.modalList.slice(0, modalCtx.modalList.length - 1)
        );
      })

      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Modal>
      <div className="product-regist-modal">
        <div className="left">
          <header>대표사진</header>
          <img
            onClick={() => {
              addThumbnailInput.current?.click();
            }}
            className="thumbnail"
            src={
              thumbnail
                ? URL.createObjectURL(thumbnail)
                : process.env.REACT_APP_DEFAULT_UPLOAD_IMAGE
            }
            alt=""
          ></img>
          <input
            className="thumbnail-image"
            type="file"
            onChange={changeThumbnail}
            ref={addThumbnailInput}
          ></input>
          <header>설명사진</header>
          <button
            className="add-sub-image-button"
            onClick={() => {
              addSubImageInput.current?.click();
            }}
          >
            +
          </button>
          <div className="sub-image-wrapper">
            {imageArray.map((file, i) => {
              return (
                <React.Fragment key={i}>
                  <img
                    className="sub-image"
                    src={URL.createObjectURL(file)}
                    alt=""
                  ></img>
                </React.Fragment>
              );
            })}
            <input
              type="file"
              className="sub-image-input"
              onChange={changeSubImage}
              ref={addSubImageInput}
              multiple
            ></input>
          </div>
        </div>
        <div className="right">
          <div>
            <label>상품명</label>
            <input
              name="name"
              type="text"
              placeholder="상품명을 입력해주세요"
              onChange={changeInputValue}
            ></input>
          </div>
          <div>
            <label>가격</label>
            <input
              name="price"
              type="text"
              placeholder="숫자를 입력해주세요"
              onChange={changeInputValue}
            ></input>
          </div>
          <div>
            <label>구매제한 ( 0개 선택 시 무제한 )</label>
            <select
              name="quantityLimit"
              onChange={changeInputValue}
              defaultValue={0}
            >
              <option value="" disabled>
                구매제한 개수를 선택해주세요
              </option>
              {Array(31)
                .fill(0)
                .map((_, i) => {
                  return (
                    <option key={i} value={i}>
                      {i} 개
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label>카테고리</label>
            <select
              name="categoryId"
              onChange={changeInputValue}
              defaultValue={""}
            >
              <option value="" disabled>
                카테고리를 선택해주세요
              </option>
              {categories.map((e) => {
                return (
                  <option key={e.name} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <button onClick={submitCreateProduct}>등록하기</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductRegistModal;
