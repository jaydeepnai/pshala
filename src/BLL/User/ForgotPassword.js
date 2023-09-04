import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import ForgotPassword from "../../Components/User/ForgotPassword";
import Post from "../../Data Repository/Post";
import { USER_FORGOT_PASSWORD } from "../../Data Repository/APIContstant";
import { toast } from "react-toastify";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import { useEffect } from "react";

function ForgotPasswordBLL() {
  //#region
  const [user, setuser] = useState({ username: "" });
  const navigation = useNavigate();

  const [info, setInfo] = useState(false);
  //#endregion

  //#region function

  const onChange = (e) => {
    e.persist();
    setInfo(false);
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  const passwordforgot = async (e) => {
    e.preventDefault();
    store.dispatch(changeProgress(20));
    setInfo(true);

    var parameters = {
      userName: user.username ? user.username : user.email,
    };
    store.dispatch(changeProgress(60));
    var result = await Post({
      parameters: parameters,
      navigation: navigation,
      ApiEndPoint: USER_FORGOT_PASSWORD,
    });
    store.dispatch(changeProgress(100));
    if (result != undefined && result?.status === 200) {
      toast.success(result?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigation("/login");
    }
  };

  const cancelpassword = () => {
    store.dispatch(changeProgress(100));
    navigation("/login");
  };

  const refreshPage = () => {
    store.dispatch(changeProgress(100));
  };

  useEffect(() => {
    refreshPage();
  }, []);

  //#endregion

  return (
    <>
      <ForgotPassword
        passwordforgot={passwordforgot}
        TextField={TextField}
        onChange={onChange}
        Button={Button}
        user={user}
        setuser={setuser}
        cancelpassword={cancelpassword}
      />
    </>
  );
}

export default ForgotPasswordBLL;
