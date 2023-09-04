import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import {
  GETGATHADETAILSPERSTUDENT,
  Get_ParentList_By_StudentId,
  NEWSTUDENTLIST,
  PARENTLISTBYMEMBERID,
  Registered_Student_List,
} from "../../Data Repository/APIContstant";
import Get from "../../Data Repository/Get";
import { changeProgress } from "../../features/User/UserSlice";
import { toast } from "react-toastify";
import { MaterialReactTable } from "material-react-table";
import { store } from "../../App/store";
import Slide from "@mui/material/Slide";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import StudentProgress from "./StudentProgress";

function StudentList() {
  const [open, setOpen] = React.useState(false);
  const [openS, setOpenS] = React.useState(false);
  const [ParentData, setParentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [data, setData] = React.useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [studentProgressID, setStudentProgressID] = useState();

  const GetStudentList = async () => {
    store.dispatch(changeProgress(0));
    try {
      //var result = await Get({ ApiEndPoint: Registered_Student_List });
      var result = await Get({ ApiEndPoint: NEWSTUDENTLIST });
      store.dispatch(changeProgress(40));

      if (result != undefined && result?.status === 200) {
        setData(result?.data);
      }
    } catch (error) {}
    store.dispatch(changeProgress(100));
  };

  const handleClickOpen = async (id) => {
    setOpen(true);
    store.dispatch(changeProgress(0));
    try {
      var parameters = [
        {
          memberId: id,
        },
      ];
      debugger;
      var result = await Get({
        parameters: parameters,
        //  ApiEndPoint: Get_ParentList_By_StudentId,
        ApiEndPoint: PARENTLISTBYMEMBERID,
      });
      store.dispatch(changeProgress(40));
      if (result != undefined && result?.status === 200) {
        setParentData(result?.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
    store.dispatch(changeProgress(100));
    // console.log(id)
  };

  const handleClickOpenStudentProgress = async (id) => {
    setOpenS(true);
    store.dispatch(changeProgress(0));
    try {
      var parameters = {
        studentId: id,
      };
      setStudentProgressID(parameters);
    } catch (error) {
      // toast.error(error.message)
    }
    store.dispatch(changeProgress(100));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseS = () => {
    setOpenS(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullName",
        header: "Full Name",
        size: 50,
        disableFilters: true,
        Cell: ({ row }) => {
          return (
            <>
              <div className="MobileTitle" data-th="Full Name : ">
                {row.original.fullName}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Student Email",
        size: 50,
        Cell: ({ row }) => {
          return (
            <>
              <div className="MobileTitle" data-th="Email : ">
                {row.original.email}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: "gender",
        header: "Gender",
        size: 50,
        Cell: ({ row }) => {
          return (
            <>
              <div className="MobileTitle" data-th="Gender : ">
                {row.original.gender}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: "pathshalaClassName",
        header: "Pathshala Class",
        size: 50,
        Cell: ({ row }) => {
          return (
            <>
              <div className="MobileTitle" data-th="Pathshala Class : ">
                {row.original.pathshalaClassName}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: "schoolGradeName",
        header: "Grade",
        size: 50,
        Cell: ({ row }) => {
          return (
            <>
              <div className="MobileTitle" data-th="School Grade : ">
                {row.original.schoolGradeName}
              </div>
            </>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 50,
        Cell: ({ row }) => {
          return (
            <>
              <div style={{ marginBottom: "5px", marginRight: "5px" }}>
                <Chip
                  label={row.original["isPaid"] == "Yes" ? "Paid" : "Not Paid"}
                  color={row.original["isPaid"] == "Yes" ? "primary" : "error"}
                />
              </div>
              <div>
                <Chip
                  label={
                    row.original["isRegistered"] == "Yes"
                      ? "Registered"
                      : "Not Registered"
                  }
                  color={
                    row.original["isRegistered"] == "Yes" ? "primary" : "error"
                  }
                />
              </div>
            </>
          );
        },
      },
      // {
      //     accessorKey: "isRegistered",
      //     header: "Registered/UnRegistered",
      //     Cell: ({ row }) => {
      //         return (
      //             <div>
      //                 <Chip label={row.original["isRegistered"]} color={row.original["isRegistered"] == "Yes" ? "primary" : "error"} />
      //             </div>
      //         );
      //     },
      // },
      {
        accessorKey: "ProgressLink",
        header: "Student Related Links",
        size: 200,
        fil: false,
        Cell: ({ row }) => {
          return (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <Button
                  onClick={() =>
                    handleClickOpenStudentProgress(row.original.studentId)
                  }
                >
                  Student Progress
                </Button>
              </div>
              <div>
                <Button onClick={() => handleClickOpen(row.original.memberId)}>
                  Gaurdian
                </Button>
              </div>
            </div>
          );
        },
      },
    ],
    []
    //end
  );

  useEffect(() => {
    GetStudentList();
  }, []);

  return (
    <>
      <div className="Page-Header">Student List</div>
      <div>
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          className="DialogWidth"
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Gaurdian Details"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {ParentData?.map((p) => (
                <Card
                  sx={{ maxWidth: 345 }}
                  style={{
                    backgroundColor: "aliceblue",
                    margin: "0",
                    marginLeft: "50px",
                    marginRight: "30px",
                    marginBottom: "10px",
                    boxShadow:
                      "4px 3px 12px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                  }}
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
                  <CardContent>
                    <div>
                      <div className="fw-bold">Relation</div>
                      {p.relationshipWithStudent}
                    </div>
                    <hr />
                    <div>
                      <div className="fw-bold">JCNJ-ID</div>
                      {p.jcnjid}
                    </div>
                    <hr />
                    <div>
                      <div className="fw-bold">Address</div>
                      {p.addressLine1},{p.addressLine2},{p.city},{p.stateName},
                      {p.zipcode}
                    </div>
                    <hr />
                    <div>
                      <div className="fw-bold">Address Type</div>
                      {p.addressType}
                    </div>
                    <hr />
                    <div style={{ display: "flex" }}>
                      <div className="fw-bold">Alternate Email</div>
                      {p.alternateEmail ? "None" : p.alternateEmail}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Go Back</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog
          open={openS}
          // TransitionComponent={Transition}
          className="DialogWidth"
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Card>
                <StudentProgress studentProgressID={studentProgressID} />
              </Card>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseS}>Go Back</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="MUI-Table Table_width PaymentList">
        <MaterialReactTable
          columns={columns}
          data={data}
          positionGlobalFilter="left"
          enableGlobalFilterModes
          initialState={{
            showGlobalFilter: true,
          }}
        />
      </div>
    </>
  );
}

export default StudentList;
