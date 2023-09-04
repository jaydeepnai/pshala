import { Button, TextField } from "@mui/material";
import React from "react";

function ForgotPassword({ passwordforgot, user, setuser, cancelpassword }) {
  return (
    <div className="container-fluid" style={{ backgroundColor: " #f5f5f5" }}>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper d-flex align-items-center justify-content-center" style={{ height: "98vh" }}>

          <div className="content-wrapper  mt-5 mb-5">

            <div
              className="shadow bg-body rounded auth-form-light text-left p-5    d-flex flex-column  align-items-center justify-content-top  "
            // style={{ marginLeft: "50px", width: "90%", marginTop: "20px" }}
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
              <span style={{ fontSize: "15px", paddingBottom: "15px" }}>We are always here to help you !</span >

              <h4 className="text-center" style={{ width: "100%" }}>
                Forgot Password
              </h4>
              <form
                onSubmit={passwordforgot}
                style={{ width: "100%", height: "100%" }}
              >
                <div className="d-flex align-items-center justify-content-center mt-4 mb-3 ">
                  <TextField
                    type="text"
                    name="userName"
                    id="outlined-basic"
                    label="User Name"
                    variant="outlined"
                    placeholder="Enter your User Name"
                    value={user.username}
                    onChange={(e) =>
                      setuser({ ...user, username: e.target.value })
                    }
                    autoFocus
                    fullWidth
                    required
                  />
                </div>
                {/* <h4 className="text-center ">OR</h4>
                <div className=" d-flex align-items-center justify-content-center mt-3 mb-3">
                  <TextField
                    type="email"
                    name="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    placeholder="Enter your registered Email"
                    value={user.email}
                    onChange={(e) =>
                      setuser({ ...user, email: e.target.value })
                    }
                    fullWidth
                  />
                </div> */}

                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="contained"
                    title="Send OTP"
                    className="btn btn-primary btnCusPad ml-2 mt-3 mb-3"
                    data-toggle="tooltip"
                    data-placement="top"
                    type="submit"
                    style={{
                      height: "46px",
                      marginLeft: "0px",
                      marginRight: "5px",
                      width: "96%",
                    }}
                  >
                    Send OTP
                  </Button>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Button
                    variant="contained"
                    title="Go to List"
                    className="btn btn-primary btnCusPad ml-2 mt-3 mb-3"
                    style={{
                      height: "46px",
                      marginLeft: "0px",
                      marginRight: "5px",
                      width: "96%",
                    }}
                    onClick={() => {
                      cancelpassword();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
