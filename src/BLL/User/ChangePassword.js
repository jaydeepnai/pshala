import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ChangePassword from "../../Components/User/ChangePassword";
import { USER_PASSWORD_CHANGE } from "../../Data Repository/APIContstant";
import Post from "../../Data Repository/Post";
import { toast } from "react-toastify";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import { useEffect } from "react";

//#endregion

function ChangePasswordBLL() {
  //#region
  const [user, setuser] = useState({
    userId: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [info, setInfo] = useState(false);
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleMouseDownNewPassword = () => setShowNewPassword(!showNewPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  //#endregion

  //#region function
  const GoToHome = () => {
    navigation(-1);
  };
  const changePassword = async (e) => {
    e.preventDefault();
    store.dispatch(changeProgress(20));
    setInfo(true);
    const LocalUser = JSON.parse(localStorage.getItem("Data"));
    var parameters = {
      userId: LocalUser?.userId,
      oldPassword: user.oldPassword,
      newPassword: user.newPassword,
    };
    store.dispatch(changeProgress(60));
    if (user.newPassword === user.confirmPassword) {
      var regExp =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

      if (regExp.test(user.newPassword)) {
        var result = await Post({
          parameters: parameters,
          navigation: navigation,
          ApiEndPoint: USER_PASSWORD_CHANGE,
        });

        store.dispatch(changeProgress(100));
        if (result != undefined && result?.status == 200) {
          // toast.success(result?.data, {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
          navigation("/login");
        }
      } else {
        toast.warning(
          "Password should have at least 8 Characters and 1 Uppercase,Lowercase,Special character",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    } else {
      setuser({ ...user, confirmPassword: "" });
      toast.warning("Password doesnot match", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
      <ChangePassword
        changePassword={changePassword}
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        Visibility={Visibility}
        VisibilityOff={VisibilityOff}
        showNewPassword={showNewPassword}
        handleClickShowConfirmPassword={handleClickShowConfirmPassword}
        handleMouseDownConfirmPassword={handleMouseDownConfirmPassword}
        showConfirmPassword={showConfirmPassword}
        handleClickShowNewPassword={handleClickShowNewPassword}
        handleMouseDownNewPassword={handleMouseDownNewPassword}
        GoToHome={GoToHome}
        user={user}
        setuser={setuser}
      />
    </>
  );
}

export default ChangePasswordBLL;
