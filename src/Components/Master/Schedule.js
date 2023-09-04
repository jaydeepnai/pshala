import { MaterialReactTable } from "material-react-table";
import React, { useEffect } from "react";
import { useState } from "react";
import Get from "../../Data Repository/Get";
import {
  ACADEMICYEAR,
  SCHEDULEINFO,
  SCHEDULEVIEW,
} from "../../Data Repository/APIContstant";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  NativeSelect,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useSSRSafeId } from "@react-aria/ssr";
import { async } from "q";
import { Delete as MUIDelete } from "@mui/icons-material";
import LibraryAddOutlinedIcon from "@mui/icons-material/LibraryAddOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { styled } from "@mui/material/styles";
import { event } from "jquery";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function Schedule() {
  const [open, setOpen] = React.useState(false);
  const [openE, setOpenE] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [UserData, setUserData] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [year, setYear] = useState("");
  const [yearId, setYearId] = useState("");
  const [dates, setDates] = useState([]);
  const [scheduleID, setScheduleID] = useState([]);
  const [scheduleDate, setScheduleDate] = useState({ scheduleDate: "" });
  const [scheduleNote, setScheduleNote] = useState({ note: "" });
  const [scheduleIsCanceled, setScheduleIsCanceled] = useState({
    isCanceled: "",
  });

  const columns = [
    {
      accessorKey: "scheduleDate",
      // header:"schedule Date",
      size: 150,
      width: "100%",
      Cell: ({ row }) => {
        var date = row.original.dates?.scheduleDate;
        var indexOfSpecificCharacter = row.original.scheduleDate?.indexOf("T");
        var formattedDate = row.original.scheduleDate?.substring(
          0,
          indexOfSpecificCharacter
        );

        return (
          <div
            style={{ textAlign: "left", marginLeft: "15px" }}
            className="MobileTitle"
            data-th="Schedule Date : "
          >
            {formattedDate}
          </div>
        );
      },
      Header: () => {
        return (
          <div style={{ textAlign: "center", marginLeft: "15px" }}>Date</div>
        );
      },
    },
    {
      accessorKey: "note",
      // header:"Note",
      size: 250,
      width: "100%",
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginLeft: "15px" }}
            className="MobileTitle"
            data-th="Note : "
          >
            {row.original.note}
          </div>
        );
      },
      Header: () => {
        return (
          <div style={{ textAlign: "center", marginLeft: "15px" }}>Note</div>
        );
      },
    },
    {
      accessorKey: "isCanceled",
      // header: "Canceled",
      width: "100%",
      size: 100,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginLeft: "15px" }}
            className="MobileTitle"
            data-th="Is Cancelled : "
          >
            <Chip
              label={row.original.isCanceled}
              color={row.original.isCanceled !== "Yes" ? "success" : "error"}
              style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}
            />
          </div>
        );
      },

      Header: () => {
        return (
          <div style={{ textAlign: "center", marginLeft: "15px" }}>
            Canceled
          </div>
        );
      },
    },
    {
      accessorKey: "Actions",

      Cell: ({ row }) => {
        return (
          <>
            <div style={{ marginLeft: "100px" }}>
              {UserRole != "Parent" && UserRole == "System Admin" ? (
                <Box
                  sx={{ display: "flex", gap: "1rem" }}
                  style={{ marginLeft: "100px" }}
                >
                  <Tooltip arrow placement="right" title="Edit Schedule">
                    <IconButton
                      color="primary"
                      onClick={() => scheduleEdit(row)}
                    >
                      <EditCalendarOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow placement="right" title="Delete">
                    <IconButton onClick={() => deleteRow(row)}>
                      <MUIDelete style={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                ""
              )}
            </div>
          </>
        );
      },
    },
  ];

  const getYearList = async () => {
    store.dispatch(changeProgress(0));
    try {
      const result = await Get({ ApiEndPoint: ACADEMICYEAR });
      store.dispatch(changeProgress(40));

      if (result != undefined && result?.status === 200) {
        setYearList(result?.data);
      }

      var parameters = [
        {
          academicYearId: CYearId,
        },
      ];
      //       // var parameters = [
      //       //   {
      //       //     academicYearId:
      //       //       result?.data[result?.data.length - 1].academicYearID,
      //       //   },
      //       // ];
      store.dispatch(changeProgress(60));

      var res = await Get({
        parameters: parameters,
        ApiEndPoint: SCHEDULEVIEW,
      });

      if (res != undefined && res?.status === 200) {
        setDates(res?.data);
      } else {
        setDates([]);
        // toast.error("No data found", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    } catch (error) {
      // toast.error(error.data, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }

    store.dispatch(changeProgress(100));
  };

  const handleYearChange = async (event) => {
    try {
      setYear(event.target.value);

      store.dispatch(changeProgress(20));
      var parameters = [
        {
          academicYearId: event.target.value,
        },
      ];

      store.dispatch(changeProgress(60));
      var result = await Get({
        parameters: parameters,
        ApiEndPoint: SCHEDULEVIEW,
      });

      if (result != undefined && result?.status === 200) {
        setDates(result?.data);

        // toast.success("All Schedule Details", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      } else {
        setDates([]);
        // toast.error("No data found", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }
    } catch (error) {
      // toast.error(error.data, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
    store.dispatch(changeProgress(100));
  };

  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  const UserRole = LocalUser?.roleName;
  const CYearId = LocalUser?.currentAcademicYearId;
  useEffect(() => {
    getYearList();
  }, []);

  useEffect(() => {
    //if (yearList.length > 0 && year == undefined) {
    //  setYear(yearList.length - 1);
    //setYear(yearList[yearList.length - 1].academicYearID);
    if (yearList.length > 0 && year === "") {
      setYear(yearList[yearList.length - 1].academicYearID);
    }
  }, [yearList]);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRow = async (row) => {
    setOpen(true);
    console.log(row);
    // setDeleteID(row.original.userDetail.id);
  };

  const handleCloseE = () => {
    setOpenE(false);
  };
  const scheduleEdit = (row) => {
    setOpenE(true);
    setScheduleID(row.original?.scheduleID);
    setScheduleDate(row.original?.scheduleDate);
    setScheduleNote(row.original?.note);
    // setScheduleIsCanceled(row.original?.isCancelled);
    console.log(row.original?.scheduleID);
    console.log(row.original?.scheduleDate);
    console.log(row.original?.note);
    console.log(row.original?.isCancelled);
  };
  const handleOpenEdit = (row) => {
    //  setOpenE(true);
    //   "action": 0,
    // "scheduleID": 0,
    // "academicYearID": 0,
    // "scheduleDate": "2023-08-25T14:43:11.350Z",
    // "note": "string",
    // "isCancelled": true
    var parameters = [
      { action: 2 },
      { scheduleDate: 1 },
      { note: 1 },
      { isCancelled: 1 },
    ];

    if (scheduleID) {
      console.log(scheduleID);
      console.log("Date:", scheduleDate);
      console.log("Note:", scheduleNote);
      console.log("isCanceled:", scheduleIsCanceled);
      debugger;
      console.log("in handle openedit");
    }
    setOpenE(false);
  };

  const handleOpenDelete = (row) => {
    setOpen(true);
    console.log("in handle openDelete");
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  const handleClickAdd = () => {
    setOpenAdd(true);
    var parameters = [{ action: 1 }];
  };

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });

  function BpRadio(props) {
    return (
      <Radio
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        {...props}
      />
    );
  }

  return (
    <div>
      <div style={{ marginLeft: "15px", marginRight: "15px" }}>
        {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="year">Academic Year</InputLabel>
          <Select
            label="Academic Year"
            id="year"
          //  value={year == undefined ? yearList.length - 1 : year}
           // value={yearList.length > 0 ? yearList[yearList.length - 1].academicYearID : ''}
           value={year}
            onChange={handleYearChange}
            style={{ minWidth: 200 }}
          >
            {yearList.map((yearItem, index) => (
              <MenuItem key={index} value={yearItem.academicYearID}>
                {yearItem.academicYearName}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <div style={{ marginTop: "-25px" }}>
          <MaterialReactTable
            data={dates}
            enableStickyHeader
            enableGlobalFilter={true}
            enableColumnActions={false}
            enableSorting={false}
            columns={columns.filter((column) => {
              return !(
                column.accessorKey === "Actions" && UserRole != "System Admin"
              );
            })}
            initialState={{
              density: "compact",
              globalFilterposition: "right",
              enableGlobalFilter: "true",
            }}
            renderTopToolbarCustomActions={() => (
              <>
                {(UserRole !== "Parent" && UserRole == "System Admin") ||
                  (UserRole == "Pathshala Admin" && (
                    <Button
                      variant="outlined"
                      startIcon={<AddOutlinedIcon />}
                      style={{ backgroundColor: "" }}
                      onClick={handleClickAdd}
                    >
                      Add Schedule
                    </Button>
                  ))}

                {UserRole !== "Parent" && UserRole == "System Admin" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<AddOutlinedIcon />}
                      style={{
                        backgroundColor: "",
                        size: 20,
                        height: "45px",
                        marginTop: "8px",
                        color: "#ff4081",
                      }}
                      onClick={handleClickAdd}
                    >
                      Add Schedule
                    </Button>

                    <FormControl
                      sx={{ m: 1, minWidth: 100, size: 20 }}
                      size="small"
                    >
                      <InputLabel
                        id="demo-controlled-open-select-label"
                        style={{
                          color: "#3c8dbc",
                        }}
                      >
                        Academic Year
                      </InputLabel>
                      <Select
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        variant="outlined"
                        value={year}
                        onChange={handleYearChange}
                        style={{ minWidth: 200, color: "#ff4081" }}
                      >
                        {yearList.map((yearItem, index) => (
                          <MenuItem key={index} value={yearItem.academicYearID}>
                            {yearItem.academicYearName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                ) : (
                  ""
                )}
              </>
            )}
          />

          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <h4 style={{ marginTop: "5px", marginLeft: "20px" }}>
                Deleting Schedule
              </h4>

              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ marginTop: "-5px", fontSize: "18px" }}
                >
                  Are you sure to delete a Schedule
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleOpenDelete} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div>
            <Dialog
              open={openE}
              onClose={handleCloseE}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <h4 style={{ marginTop: "5px", marginLeft: "20px" }}>
                Edit Schedule
              </h4>

              <DialogContent>
                <DialogContentText>
                  <Card>
                    <CardHeader />
                    <CardContent>
                      <div>
                        <div className="fw-bold"></div>

                        <TextField
                          type="date"
                          label="Date"
                          id="outlined-size-small"
                          size="small"
                          variant="outlined"
                          value={scheduleDate?.scheduleDate}
                          onChange={(event) =>
                            setScheduleDate({
                              ...scheduleDate,
                              scheduleDate: event.target.value,
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <hr />
                      <div>
                        <div className="fw-bold"></div>
                        <TextField
                          label="Note"
                          id="outlined-size-small"
                          // defaultValue="Note"
                          size="small"
                          value={scheduleNote?.note}
                          onChange={(event) =>
                            setScheduleNote({
                              ...scheduleNote,
                              note: event.target.value,
                            })
                          }
                        />
                      </div>
                      <hr />
                      <FormControl>
                        <FormLabel id="demo-customized-radios">
                          isCanceled
                        </FormLabel>
                        <RadioGroup
                          //  defaultValue="No"
                          aria-labelledby="demo-customized-radios"
                          name="customized-radios"
                          value={scheduleIsCanceled?.isCanceled}
                          onChange={(event) =>
                            setScheduleIsCanceled({
                              ...scheduleIsCanceled,
                              isCanceled: event.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value="female"
                            control={<BpRadio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="male"
                            control={<BpRadio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                  </Card>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseE} style={{ color: "blue" }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleOpenEdit}
                  autoFocus
                  style={{ backgroundColor: "#2196f3", color: "black" }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div>
            <Dialog
              open={openAdd}
              onClose={handleCloseAdd}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <h4 style={{ marginTop: "5px", marginLeft: "20px" }}>
                Add new Schedule
              </h4>

              <DialogContent>
                <DialogContentText>
                  <Card>
                    <CardHeader />
                    <CardContent>
                      <div>
                        <div className="fw-bold"></div>

                        <TextField
                          type="date"
                          label="Schedule Date"
                          id="outlined"
                          size="small"
                          variant="outlined"
                          //   value={scheduleDate.scheduleDate}
                          // onChange={(event) =>
                          //   setScheduleDate({
                          //     ...scheduleDate,
                          //     scheduleDate: event.target.value,
                          //   })
                          // }
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <hr />
                      <div>
                        <div className="fw-bold"></div>
                        <TextField
                          label="Note"
                          id="outlined-size-small"
                          defaultValue="Note"
                          size="small"
                          value={scheduleNote.note}
                          onChange={(event) =>
                            setScheduleNote({
                              ...scheduleNote,
                              note: event.target.value,
                            })
                          }
                        />
                      </div>
                      <hr />
                      <FormControl>
                        <FormLabel id="demo-customized-radios">
                          isCanceled
                        </FormLabel>
                        <RadioGroup
                          //  defaultValue="No"
                          aria-labelledby="demo-customized-radios"
                          name="customized-radios"
                          value={scheduleIsCanceled.isCanceled}
                          onChange={(event) =>
                            setScheduleIsCanceled({
                              ...scheduleIsCanceled,
                              isCanceled: event.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value="female"
                            control={<BpRadio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="male"
                            control={<BpRadio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </CardContent>
                  </Card>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseE} style={{ color: "blue" }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleOpenEdit}
                  autoFocus
                  style={{ backgroundColor: "#2196f3", color: "black" }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
