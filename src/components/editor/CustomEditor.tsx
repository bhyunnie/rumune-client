import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import CustomBuildEditor from "ckeditor5-custom-build/build/ckeditor";
import "./CustomEditor.css";

const API_URL = "http://localhost:8080";
const UPLOAD_ENDPOINT = "api/v1/file/upload";

const CustomEditor = () => {
  function uploadAdapter(loader: any) {
    return {
      upload: function () {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: string | Blob) => {
            body.append("file", file);
            console.log(`${API_URL}/${UPLOAD_ENDPOINT}`);
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

  function uploadPlugin(editor: any) {
    console.log(editor);
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
      data="<p>게시글</p>"
    ></CKEditor>
  );
};

export default CustomEditor;
