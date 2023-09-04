import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  SvgIcon,
  TextField,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { changeProgress } from "../../features/User/UserSlice";
import React, { useState } from "react";
import { store } from "../../App/store";
import Get from "../../Data Repository/Get";
import { Get_RegisteredStudentList_By_UserID } from "../../Data Repository/APIContstant";
import { toast } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";
import { useEffect } from "react";

function ParentDashboard() {
  const [data, setData] = useLocalStorageState("Data", {});
  const [StudentData, setStudentData] = useState();
  const [open, setOpen] = useState();
  const [studentProfile, setStudentProfile] = React.useState({
    fullName: "",
    middleName: "",
    lastName: "",
    gender: "",
    email: "",
    schoolGradeName: "",
    cellPhone: "",
  });
  // const [studentProfile, setStudentProfile] = React.useState({firstName:'Nikhil',MiddleName:'Netaji',LastName:'Nikam',
  //Gender:'Female',PathshalaClass:'9',Email:'nik@gmail.com',PhoneNumber:'9090897876'});

  const GetStudentList = async () => {
    store.dispatch(changeProgress(0));
    try {
      // console.log(data)
      var parameters = [
        {
          userID: data.userId,
        },
      ];

      var result = await Get({
        parameters: parameters,
        ApiEndPoint: Get_RegisteredStudentList_By_UserID,
      });
      store.dispatch(changeProgress(40));
      if (result != undefined && result?.status === 200) {
        setStudentData(result?.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
    store.dispatch(changeProgress(100));
    // console.log(id)
  };

  console.log("Parent Dashboard", StudentData);
  useEffect(() => {
    GetStudentList();
  }, []);

  const openStudentProfile = (studentId) => {
    console.log("Profile", studentId);

    setStudentProfile(studentId);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate=()=>{

  };
  const handleUpload = () => {
    // Implement your upload logic here
    // You can use APIs like FormData and fetch/axios to send the image to your server
  };

  return (
    <>
      <div className="Form-Container">
        <div>
          <Dialog
            open={open}
            // TransitionComponent={Transition}
            className="DialogWidth"
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Student Profile
                <span className="block border border-success"></span>
                <Card>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                      display: "flex",
                      flexWrap: "wrap",
                      size: "small",
                      width: "fit-content",
                      maxWidth: "fit-content",
                      marginTop:'5px'
                    }}
                    noValidate
                  >
                    <TextField
                      id="outlined-basic"
                      label="First Name"
                      value={studentProfile.fullName}
                      variant="outlined"
                      onChange={(event) =>
                        setStudentProfile({
                          ...studentProfile,
                          fullName: event.target.value,
                        })
                      }
                    />
                    <TextField
                      id="outlined-basic-small"
                      label="Middle Name"
                      value={studentProfile.middleName}
                      variant="outlined"
                      onChange={(event) =>
                        setStudentProfile(event.target.value)
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Last Name"
                      value={studentProfile.LastName}
                      variant="outlined"
                      onChange={(event) =>
                        setStudentProfile(event.target.value)
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Gender"
                      value={studentProfile.gender}
                      variant="outlined"
                      onChange={(event) =>
                        setStudentProfile(event.target.value)
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Pathshala Class"
                      value={studentProfile.schoolGradeName}
                      variant="outlined"
                      onChange={(event) =>
                        setStudentProfile(event.target.value)
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      value={studentProfile.email}
                      variant="outlined"
                      onChange={(event) =>
                        setStudentProfile(event.target.value)
                      }
                    />
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      value={studentProfile.cellPhone}
                      variant="outlined"
                      onChange={(event) =>
                        setStudentProfile(event.target.value)
                      }
                    />
                    {/* <label htmlFor="imageInput">Photo</label> */}
                    <input
                      type="file"
                      accept="image/*"
                      id="imageInput"
                      onChange={handleImageChange}
                    />
                    {selectedImage && (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{ maxWidth: "100%", marginTop: "10px" }}
                      />
                    )}
                    {/* {selectedImage && (
                      <button onClick={handleUpload}>Upload</button>
                    )} */}
                  </Box>
                </Card>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" size="sm" onClick={handleProfileUpdate()}>Update Profile</Button>
            {/* <Button size="sm">Update Profile</Button> */}
              <Button variant="outlined" size="sm" onClick={handleClose}>Go Back</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="Content-form" id="form1">
          <div className="Form-Header ">Kids Detail</div>
          <div className="STDCard">
            <span className="block border border-success"></span>
            <div style={{ display: "flex" }} className="row">
              {StudentData?.map((p, index) => (
                <Card
                  key={p.studentId}
                  sx={{ maxWidth: 345, marginRight: 5, borderRadius: "15px" }}
                  className="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 m-2"
                  //    onClick={openStudentProfile(p.studentId)}
                >
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {p.fullName[0]}
                      </Avatar>
                    }
                    title={p.fullName}
                    subheader={`Email : ` + p.email}
                  />
                  {/* {console.log(
                    p.gender == "Female"
                      ? 'url("/assets/images/faces/Girl.png")'
                      : 'url("/assets/images/faces/Boy.png")'
                  )} */}
                  <CardMedia
                    sx={{
                      backgroundImage:
                        p.gender == "Female"
                          ? 'url("/assets/images/faces/Girl.png")'
                          : 'url("/assets/images/faces/Boy.png")',
                      height: "151px",
                      width: "150px",
                      position: "relative",
                      left: "25%",
                    }}
                    // image="/assets/images/faces/Boy.png"
                    title="View Profile"
                    object-fit
                    style={{ cursor: "pointer" }}
                    onClick={() => openStudentProfile(p)}
                  />
                  <CardContent>
                    <div>
                      <div className="fw-bold">Pathshala ClassName</div>
                      {p.pathshalaClassName}
                    </div>
                    <div className="CusHR" />
                    <div>
                      <div className="fw-bold">School GradeName</div>
                      {p.schoolGradeName}
                    </div>
                    {/* <hr /> */}
                    <div>
                      <div className="fw-bold">Phone</div>
                      {p.cellPhone}
                    </div>
                    {/* <hr /> */}
                    <div>
                      <Chip
                        className="m-1"
                        label={p.isPaid == "Yes" ? "Paid" : "Not Paid"}
                        color={p.isPaid == "Yes" ? "primary" : "error"}
                      />
                      <Chip
                        className="m-1"
                        label={
                          p.isRegistered == "Yes"
                            ? "Registered"
                            : "Not Registered"
                        }
                        color={p.isRegistered == "Yes" ? "primary" : "error"}
                      />
                      <Chip
                        label={p.gender}
                        className="m-1"
                        color={p.gender == "Female" ? "primary" : "error"}
                      />
                    </div>
                  </CardContent>
                  {/* <Button
                                    variant="contained"
                                    color="primary"
                                    // className='m-2'
                                    style={{
                                        marginLeft: '15px',
                                        marginTop: '-5px',
                                        marginBottom: '15px',
                                        // backgroundColor: '#45b7f9'
                                    }}
                                    disableElevation={true}
                                >
                                    Profile
                                </Button> */}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ParentDashboard;
