const awsUtil = {
  getFileURL: (directory: string, uuid: string, ext: string) => {
    return `${process.env.REACT_APP_AWS_S3_URL}${directory.replace(
      "rumune",
      ""
    )}/${uuid}.${ext}`;
  },

  // 아마 없앨듯 나중에 아직 서버에서 보내는게 정제 안됨 수정필요
  getFileURLArray: (fileList: any[]): string[] => {
    const array: string[] = fileList.map((file) => {
      return `${process.env.REACT_APP_AWS_S3_URL}${file.bucketName.replace(
        "rumune",
        ""
      )}/${file.fileUUID}.${file.ext}`;
    });
    return array;
  },
};

export default awsUtil;
