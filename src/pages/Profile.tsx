import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const userCtx = useContext(UserContext);
  useEffect(() => {}, [userCtx]);

  return (
    <div className="">
      <div className="">{userCtx.user.provider}</div>
      <img src={userCtx.user.profileImage} alt=""></img>
      <div className="">{userCtx.user.provider}</div>
      <div className="">{userCtx.user.providerId}</div>
      <div className="">{userCtx.user.userId}</div>
      <div className="">{userCtx.user.username}</div>
      <div className="">{userCtx.user.userId}</div>
      <div className="">{userCtx.user.createdAt}</div>
      {userCtx.user.email}
    </div>
  );
};

export default Profile;
