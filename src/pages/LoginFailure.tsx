import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LoginFailure = () => {
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [provider, setProvider] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.forEach((value, key) => {
      if (key === "email") setEmail(value);
      if (key === "provider") setProvider(value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>이미 {provider.toUpperCase()}로 가입된 내역이 존재합니다.</div>
      <div>{provider}</div>
      <div>{email}</div>
    </div>
  );
};

export default LoginFailure;
