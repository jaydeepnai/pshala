import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Text } from "@adobe/react-spectrum";

function Login({
  handleRefresh,
  CheckLogin,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  VisibilityOff,
  Visibility,
  stringRandom,
  inputRefCaptcha,
  ForgetPassword,
  login,
  setLogin,
  SignupPage,
  openURL,
}) {
  return (
    <div className="container-fluid" style={{ backgroundColor: " #f5f5f5" }}>
      <div
        className="container-fluid page-body-wrapper full-page-wrapper d-flex align-items-center justify-content-center"
        style={{ height: "98vh" }}
      >
        <div className="content-wrapper  mt-5 mb-5">
          <div
            className="shadow bg-body rounded auth-form-light text-left p-3   d-flex flex-column  align-items-center justify-content-top "
            style={{ padding: "30px !important" }}
          >
            <div
              className="heading"
              style={{ color: "solid rgb(50, 86, 215)" }}
            >
              <h1>
                <span className="fw-bold">Path</span>shala
              </h1>
            </div>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
              alt="Logo"
              style={{ width: "40%", marginRight: "10px" }}
            />

            <h4 className="custom-heading">Hello! let's get started</h4>

            <h6 className="custom-subheading font-weight-light">
              Login in to continue.
            </h6>

            <form
              className="col-12 mt-4 mb-0 pb-1"
              onSubmit={CheckLogin}
              // style={{ height: " 320px" }}
            >
              <div className="col-12 mt-1 mb-4">
                <TextField
                  id="outlined-basic"
                  label="User Name"
                  value={login.userName}
                  variant="outlined"
                  placeholder="Enter your userName"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) =>
                    setLogin({ ...login, userName: e.target.value })
                  }
                />
              </div>

              <div className="col-12 mt-3 mb-3">
                <FormControl variant="outlined" fullWidth>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    id="outlined-adornment-password"
                    label="Password"
                    value={login.password}
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    required
                  />
                </FormControl>
                <Button
                  variant="contained"
                  title="login"
                  type="submit"
                  style={{
                    width: "100%",
                    height: "48px",
                    marginRight: "7px",
                    marginTop: "20px",
                  }}
                  className="custom-button"
                >
                  LOG IN
                </Button>
              </div>
              {/* 
              <div className="data-row mt-0"></div>
              <div
                className=" d-flex align-items-center justify-content-center mb-3"
                style={{ marginRight: "10px" }}
              >
                <div className="mr-5">
                  <label className="col-lg-4 ml-2" type="label">
                    Captcha:
                  </label>
                </div>

                <div className="d-flex align-items-center justify-content-center ">
                  <label
                    className="col-lg-4 d-flex align-items-center justify-content-center "
                    disabled
                    style={{ marginLeft: "10px" }}
                  >
                    {stringRandom}
                    <IconButton
                      onClick={handleRefresh}
                      color="primary"
                      aria-label="refresh"
                    >
                      <RefreshIcon />
                    </IconButton>
                  </label>
                </div>
              </div> */}

              {/* <TextField
                id="CaptchaInput"
                label="Enter Captcha"
                placeholder="Enter Captcha"
                ref={inputRefCaptcha}
                fullWidth
               multiline={false}
                required
                value={login.CaptchaInput}
                onChange={(e) =>
                  setLogin({
                    CaptchaInput: e.target.value,
                    userName: login.userName,
                    password: login.password,
                  })
                }
              /> */}

              {/* <div className="Button mt-4 mb-0 d-flex justify-content-center align-items-center">
                <Button
                  variant="contained"
                  title="login"
                  type="submit"
                  style={{ width: "98%", height: "48px", marginRight: "7px" }}
                  className="custom-button"
                >
                  LOG IN
                </Button>
              </div> */}
              <div>
                <div className="my-2 d-flex justify-content-between align-items-center">
                  <Button
                    href="#"
                    onClick={ForgetPassword}
                    className="auth-link text-black"
                    style={{
                      textDecoration: "none",
                      color: "primary",
                      cursor: "pointer",
                    }}
                  >
                    Forgot password?
                  </Button>

                  <Button
                    onClick={SignupPage}
                    className="auth-link text-black"
                    style={{ textDecoration: "none", color: "primary" }}
                  >
                    Registeration
                  </Button>
                </div>
                <Box sx={{ "& button": { m: 1, position: "relative" } }}>
                  <div>
                    <Button
                      size="small"
                      style={{
                        display: "flex",
                        width: "97%",
                        alignContent: "left",
                        alignItems: "centre",
                        color: "red",
                        backgroundColor: "#ffcdd2",
                        marginRight: "px",
                        textDecoration: "underline",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        style={{
                          pointerEvents: "auto",
                          cursor: "pointer",
                          fontFamily: "Arial",
                          fontSize: "18px",
                          fontWeight: "bold",
                          lineHeight: "1.5",

                          // textShadow:' 2px 2px 4px rgba(0, 0, 0, 0.5)'
                        }}
                        onClick={openURL}
                      >
                        Teacher Login
                      </span>
                    </Button>
                  </div>
                </Box>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
