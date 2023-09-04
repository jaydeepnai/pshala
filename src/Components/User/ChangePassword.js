import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";

function ChangePassword({
  changePassword,
  showPassword,
  user,
  setuser,
  handleClickShowPassword,
  handleMouseDownPassword,
  Visibility,
  VisibilityOff,
  showNewPassword,
  handleClickShowConfirmPassword,
  handleMouseDownConfirmPassword,
  showConfirmPassword,
  handleMouseDownNewPassword,
  handleClickShowNewPassword,
  GoToHome,
}) {
  return (
    <div className="container-fluid" style={{ backgroundColor: " #f5f5f5" }}>
      <div className="container-fluid page-body-wrapper full-page-wrapper d-flex align-items-center justify-content-center">
        <div className="content-wrapper mt-5 mb-5" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div
            className="shadow bg-body rounded auth-form-light text-left p-5   d-flex flex-column  align-items-center justify-content-top  "
            style={{ width: "350px", marginTop: "20px" }}
          >
            <div
              className=" font-weight-bold h3 text-black title rounded titleIcon p-1 "
            // style={{ marginLeft: "70px" }}
            >
              &nbsp;Change Password
            </div>
            <form
              style={{ width: "100%", height: "100%" }}
              onSubmit={changePassword}
            >
              <div className="d-flex align-items-center justify-content-center">
                <div className="row">
                  <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
                    <TextField
                      title={showPassword ? "Hide Password" : "Show Password"}
                      type={showPassword ? "text" : "password"}
                      name="Password"
                      label="Current Password "
                      id="outlined-basic"
                      variant="outlined"
                      placeholder="Current Password"
                      value={user.oldpassword}
                      fullWidth
                      onChange={(e) =>
                        setuser({ ...user, oldPassword: e.target.value })
                      }
                      autoFocus
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-3 mb-3 ">
                    <TextField
                      title={
                        showNewPassword ? "Hide password" : "Show Password"
                      }
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="outlined-basic"
                      label="New Password"
                      variant="outlined"
                      placeholder="New Password"
                      value={user.newPassword}
                      fullWidth
                      onChange={(e) =>
                        setuser({ ...user, newPassword: e.target.value })
                      }
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowNewPassword}
                              onMouseDown={handleMouseDownNewPassword}
                            >
                              {showNewPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-center mt-3 mb-3">
                    <TextField
                      title={
                        showConfirmPassword ? "Hide Password" : "Show Password"
                      }
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="outlined-basic"
                      label="Confirm Password"
                      variant="outlined"
                      placeholder="Confirm Password"
                      fullWidth
                      value={user.confirmPassword}
                      onChange={(e) =>
                        setuser({ ...user, confirmPassword: e.target.value })
                      }
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownConfirmPassword}
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row d-flex align-items-center justify-content-center col-sm ">
                <Button
                  variant="contained"
                  ton
                  title="Change Password"
                  data-toggle="tooltip"
                  data-placement="top"
                  type="submit"
                  className="btn btn-primary mr-2 mt-3 mb-3 btnCusPad"
                  fullWidth
                  style={{
                    height: "43px",
                    marginLeft: "0px",
                    marginRight: "7px",
                    width: "89%",
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  title="Go to List"
                  className="btn btn-primary btnCusPad ml-2 mt-3 mb-3"
                  onClick={GoToHome}
                  style={{
                    height: "43px",
                    marginLeft: "0px",
                    marginRight: "7px",
                    width: "89%",
                  }}
                >
                  Back
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
