import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Login from "../../Components/User/Login";
import { LOGIN } from "../../Data Repository/APIContstant";
import { toast } from "react-toastify";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import LPost from "../../Data Repository/LoginPost";
import Cookies from "js-cookie";

function LoginBLL() {
  //#region variables
  const [login, setLogin] = useState({
    userName: "",
    password: "",
    CaptchaInput: "",
  });
  const [IsError, setIsError] = useState(false);
  const [stringRandom, setStringRandom] = useState("");
  const User = useSelector((state) => state.User.UserDetails);
  const inputRefUserName = useRef(null);
  const inputRefPassword = useRef(null);
  const inputRefCaptcha = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigation = useNavigate();
  const [user, setUser] = useState();
  //#endregion

  //#region methods

  useEffect(() => {
    refreshPage();
  }, []);

  // useEffect(() => {
  //   // setStringRandom(generateString(6));
  // }, []);

  // const characters = "abc123";
  // function generateString(length) {
  //   let result = "";
  //   const charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }
  const ForgetPassword = () => {
    store.dispatch(changeProgress(100));
    navigation("/ForgotPassword");
  };

  const SignupPage = () => {
    store.dispatch(changeProgress(100));
    navigation("/StudentRegisteration");
  };

  // const handleRefresh = () => {
  //   const newgenerateString = generateString(6);
  //   setStringRandom(newgenerateString);
  // };

  const CheckLogin = async (e) => {
    e.preventDefault();
    store.dispatch(changeProgress(20));
    setIsError(true);
    if (login.userName.length === 0) {
      toast.warning("Enter your user name", {
        position: toast.POSITION.TOP_RIGHT,
      });
      inputRefUserName.current?.focus();
    } else if (login.password.length === 0) {
      toast.warning("Enter your password", {
        position: toast.POSITION.TOP_RIGHT,
      });
      inputRefPassword.current?.focus();
    }
    //  else if (login.CaptchaInput.length === 0) {
    //   toast.warning("Please enter the captcha value", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });

    //   inputRefCaptcha.current?.focus();
    // } else if ((login.CaptchaInput === stringRandom) == false) {
    //   toast.warning("You have entered the wrong captcha value", {
    //   });
    //   inputRefCaptcha.current?.focus();
    // }
    else {
      try {
        const parameters = {
          userName: login.userName,
          password: login.password,
        };

        store.dispatch(changeProgress(60));

        var result = await LPost({
          parameters,
          navigation,
          ApiEndPoint: LOGIN,
        });
        store.dispatch(changeProgress(100));

        if (result != undefined && result?.status === 200) {
          setUser(result?.data);
          const jsonString = JSON.stringify(result?.data);
          localStorage.setItem("Data", jsonString);
          const LocalUser = JSON.parse(localStorage.getItem("Data"));
          const LUserToken = LocalUser.token;
          Cookies.set("Token", LUserToken);
          // toast.success("You are logged in Successfully", {
          //   position: toast.POSITION.TOP_RIGHT,
          // });

          if (
            result?.data?.roleName == "Pathshala Admin" ||
            result?.data?.roleName == "System Admin"
          ) {
            navigation("/AdminDashboard");
          } else {
            navigation("/ParentDashboard");
          }
        }
      } catch (error) {
        toast.error(error.response.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const refreshPage = () => {
    store.dispatch(changeProgress(100));
  };

  const openURL = () => {
    // Replace 'https://ftjpnj.jainpathshala.org' with the actual URL you want to open.
    window.location.href = "https://teacher.ftjpnj.jainpathshala.org";
  };

  return (
    <>
      <Login
        showPassword={showPassword}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        CheckLogin={CheckLogin}
        VisibilityOff={VisibilityOff}
        Visibility={Visibility}
        stringRandom={stringRandom}
        inputRefCaptcha={inputRefCaptcha}
        inputRefUserName={inputRefUserName}
        ForgetPassword={ForgetPassword}
        login={login}
        setLogin={setLogin}
        // handleRefresh={handleRefresh}
        SignupPage={SignupPage}
        openURL={openURL}
      />
    </>  

  );
}

export default LoginBLL;
