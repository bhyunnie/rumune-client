import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import CustomBuildEditor from "ckeditor5-custom-build/build/ckeditor";
import "./CustomEditor.css";
import axiosUtil from "../../global/utils/axiosUtil";

const CustomEditor = (props: { setData: Function }) => {
  function uploadAdapter(loader: any) {
    return {
      upload: function () {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then(async (file: string | Blob) => {
            body.append("file", file);
            body.append("domain", "PRODUCT_POST");
            axios({
              method: "POST",
              url: `${process.env.REACT_APP_SERVER_URL}/admin/api/v1/image/upload`,
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: await axiosUtil.getBearerToken(),
              },
              data: body,
            })
              .then((data) => {
                resolve({ default: data.data.result[0].fileURL });
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

  return (
    <CKEditor
      config={{ extraPlugins: [uploadPlugin] }}
      editor={CustomBuildEditor}
      data=""
      onChange={(event: any, editor: any) => {
        props.setData(editor.getData());
      }}
    ></CKEditor>
  );
};

export default CustomEditor;
