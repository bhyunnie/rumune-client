import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import CustomBuildEditor from "ckeditor5-custom-build/build/ckeditor";
import "./CustomEditor.css";

const CustomEditor = (props: {
  setData: Function;
  submitButtonClick: Function;
}) => {
  function uploadAdapter(loader: any) {
    return {
      upload: function () {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: string | Blob) => {
            body.append("file", file);
            axios({
              method: "POST",
              url: `${process.env.REACT_APP_SERVER_URL}/api/v1/file/upload`,
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: body,
            })
              .then((data) => {
                resolve({ default: data.data.url });
              })
              .catch((e) => {
                reject(e);
              });
          });
        });
      },
    };
  }

  // arrow funciton 사용 시 에러
  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  }

  const SubmitButton = () => {
    const button = document.createElement("button");
    button.classList.add("custom-editor-submit-button");
    button.innerText = "상품 등록";
    button.addEventListener("click", () => {
      props.submitButtonClick();
    });
    return button;
  };

  const addSubmitButton = () => {
    if (window.location.pathname.includes("write")) {
      const submitButton = SubmitButton();
      document.querySelector(".ck-toolbar_grouping")?.appendChild(submitButton);
    }
  };

  return (
    <CKEditor
      config={{ extraPlugins: [uploadPlugin] }}
      editor={CustomBuildEditor}
      data="<p>게시글</p>"
      onReady={addSubmitButton}
      onChange={(event: any, editor: any) => {
        props.setData(editor.getData());
      }}
    ></CKEditor>
  );
};

export default CustomEditor;
