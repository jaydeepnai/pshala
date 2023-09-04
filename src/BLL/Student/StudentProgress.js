import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography, useMediaQuery
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { MaterialReactTable } from "material-react-table";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import Get from "../../Data Repository/Get";
import {
  ACADEMICYEAR,
  GETGATHADETAILSPERSTUDENT,
  Get_RegisteredStudentList_By_UserID,
} from "../../Data Repository/APIContstant";
import { toast } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";
import { useTheme } from '@mui/material/styles';

function StudentProgress(studentProgressID) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useLocalStorageState("Data", {});
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  const [selectStudentId, setSelectStudentId] = React.useState([]);
  const [selectYear, setSelectYear] = React.useState("");

  const [selectYearId, setSelectYearId] = React.useState([]);
  const [yearList, setYearList] = useState([]);

  const [gathDetails, setGathaDetails] = useState([]);

  const [studentSutraProfile, setStudentSutraProfile] = useState([
    { studentName: "", gradeName: "", lastGathaID: "", lastScheduleDate: "" },
  ]);
  const [gathaStats, setGathaStats] = useState([
    { totalDays: 0, presentDays: 0, totalGathas: 0 },
  ]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Adjust breakpoint as needed




  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    ></Box>
  );

  const card1 = (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <CalendarMonthIcon
            style={{
              color: "#03a9f4",
              fontSize: "5rem",
              marginTop: "12px",
              marginLeft: "10px",
            }}
            className="ProgressCard"
          />
        </div>
        <div>
          <CardContent className="CardContent">
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold", color: "dark" }}
              color="text.secondary"
              gutterBottom
            >
              TOTAL DAYS
            </Typography>

            <Typography variant="body2">{gathaStats[0]?.totalDays}</Typography>
          </CardContent>
        </div>
      </div>
    </>
  );

  const card2 = (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <CalendarMonthIcon
            style={{
              color: "#2e7d32",
              fontSize: "5rem",
              marginTop: "12px",
              marginLeft: "10px",
            }}
            className="ProgressCard"
          />
        </div>
        <div>
          <CardContent className="CardContent">
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold", color: "dark" }}
              color="text.secondary"
              gutterBottom
            >
              PRESENT DAYS
            </Typography>

            <Typography variant="body2">
              {gathaStats[0]?.presentDays}
            </Typography>
          </CardContent>
        </div>
      </div>
    </>
  );

  const card3 = (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <CalendarMonthIcon
            style={{
              color: "#f44336",
              fontSize: "5rem",
              marginTop: "12px",
              marginLeft: "10px",
            }}
            className="ProgressCard"
          />
        </div>
        <div>
          <CardContent className="CardContent">
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold", color: "dark" }}
              color="text.secondary"
              gutterBottom
            >
              ABSENT DAYS
            </Typography>

            <Typography variant="body2">
              {gathaStats[0]?.totalDays - gathaStats[0]?.presentDays}
            </Typography>
          </CardContent>
        </div>
      </div>
    </>
  );

  const card4 = (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <CalendarMonthIcon
            style={{
              color: "#ff9800",
              fontSize: "5rem",
              marginTop: "12px",
              marginLeft: "10px",
            }}
            className="ProgressCard"
          />
        </div>
        <div>
          <CardContent className="CardContent">
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold", color: "dark" }}
              color="text.secondary"
              gutterBottom
            >
              TOTAL GATHAS
            </Typography>

            <Typography variant="body2">
              {gathaStats[0]?.totalGathas}
            </Typography>
          </CardContent>
        </div>
      </div>
    </>
  );

  const Columns = [
    {
      accessorKey: "scheduleDate",
      header: "Schedule Date",
      size: 90,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="Schedule Date : "
          >
            {row.original.scheduleDate}
          </div>
        );
      },
    },
    {
      accessorKey: "attendance",
      header: "Attendance",

      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="Attendence : "
          >
            {row.original.attendance}
          </div>
        );
      },
    },

    {
      accessorKey: "completedGathaCount",
      header: "Completed Gatha",
      size: 90,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="Complated Gatha : "
          >
            {row.original.completedGathaCount}
          </div>
        );
      },
    },
    {
      accessorKey: "progressDetail",
      header: "Progress Detail",
      size: 90,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="Progress Detail : "
          >
            {row.original.progressDetail}
          </div>
        );
      },
    },
    {
      accessorKey: "completedSutraRevision",
      header: "Completed Sutra Revision",
      size: 90,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="Completed Sutra Revision : "
          >
            {row.original.completedSutraRevision}
          </div>
        );
      },
    },
    {
      accessorKey: "teacherNotes",
      header: "Teacher Notes",
      size: 90,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="Teacher Notes : "
          >
            {row.original.teacherNotes}
          </div>
        );
      },
    },
  ];

  const GetStudentList = async () => {
    store.dispatch(changeProgress(0));
    try {
      if (Object.keys(studentProgressID).length === 0) {
        var parameters = [
          {
            userID: data.userId,
          },
        ];

        var result = await Get({
          parameters: parameters,
          ApiEndPoint: Get_RegisteredStudentList_By_UserID,
        });
        store.dispatch(changeProgress(20));
        if (result != undefined && result?.status === 200) {
          setStudentData(result?.data);

          let studentid = result?.data[result?.data.length - 1];

          const currentStudent = result?.data[result?.data.length - 1];
          setSelectedStudent(currentStudent?.fullName);
          setSelectStudentId(currentStudent?.studentId);

          var parameters = [
            {
              studentID: studentid?.studentId,
            },
          ];

          if (studentid !== undefined) {
            var result = await Get({
              parameters: parameters,
              ApiEndPoint: GETGATHADETAILSPERSTUDENT,
            });
            store.dispatch(changeProgress(40));
            if (result != undefined && result?.status === 200) {
              setGathaDetails(result?.data?.studentProgressDetailsReport);
              setGathaStats(result?.data?.studentProgressDetailsStatistics);
              setStudentSutraProfile(result?.data?.studentSutraProfile);
            }
          } else {
            // toast.error("No Data found", {
            //   position: toast.POSITION.TOP_RIGHT,
            // });
          }
        }
        store.dispatch(changeProgress(60));
      } else {
        store.dispatch(changeProgress(20));
        var parameters = [
          {
            studentID: studentProgressID?.studentProgressID?.studentId,
          },
        ];
      }
      var studentId = studentProgressID?.studentProgressID?.studentId;
      if (studentId !== undefined) {
        var result = await Get({
          parameters: parameters,
          ApiEndPoint: GETGATHADETAILSPERSTUDENT,
        });

        store.dispatch(changeProgress(40));
        if (result != undefined && result?.status === 200) {
          setGathaDetails(result?.data?.studentProgressDetailsReport);
          setGathaStats(result?.data?.studentProgressDetailsStatistics);
          setStudentSutraProfile(result?.data?.studentSutraProfile);
        }
        store.dispatch(changeProgress(60));
      }

      try {
        const result = await Get({ ApiEndPoint: ACADEMICYEAR });
        store.dispatch(changeProgress(40));

        if (result != undefined && result?.status === 200) {
          setYearList(result?.data);

          const lastYear = result?.data[result?.data.length - 1];
          setSelectYear(lastYear?.academicYearName);
          setSelectYearId(lastYear?.academicYearID);
        }
        store.dispatch(changeProgress(60));
      } catch (error) {
        store.dispatch(changeProgress(100));
      }
    } catch (error) {
      toast.error(error.message);
    }
    store.dispatch(changeProgress(100));
  };

  const handleSelectSudentChange = async (event) => {
    try {
      const selectedStudentValue = event.target.value;
      const selectedStudentObject = studentData.find(
        (student) => student?.fullName === selectedStudentValue
      );

      setSelectedStudent(selectedStudentValue);
      setSelectStudentId(selectedStudentObject?.studentId || "");

      store.dispatch(changeProgress(20));
      var parameters = [
        {
          studentID: selectedStudentObject?.studentId,
        },
        {
          academicYearID: selectYearId,
        },
      ];
      var result = await Get({
        parameters: parameters,
        ApiEndPoint: GETGATHADETAILSPERSTUDENT,
      });

      store.dispatch(changeProgress(40));
      if (result != undefined && result?.status === 200) {
        setGathaDetails(result?.data?.studentProgressDetailsReport);
        setGathaStats(result?.data?.studentProgressDetailsStatistics);
        setStudentSutraProfile(result?.data?.studentSutraProfile);

        if (
          result?.data?.studentProgressDetailsReport?.length === 0 ||
          result?.data?.studentProgressDetailsStatistics?.length === 0
        ) {
          // toast.error("No data found", {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
        }
      }

      store.dispatch(changeProgress(60));
    } catch (error) {
      toast.error(error.message);
    }
    store.dispatch(changeProgress(100));
  };

  const handleSelectYearChange = async (event) => {
    try {
      const selectedYearValue = event.target.value;
      const selectedYearObject = yearList.find(
        (year) => year.academicYearName === selectedYearValue
      );

      setSelectYear(selectedYearValue);
      setSelectYearId(selectedYearObject?.academicYearID || "");

      store.dispatch(changeProgress(20));
      if (Object.keys(studentProgressID).length === 0) {
        var parameters = [
          {
            studentID: selectStudentId,
          },
          {
            academicYearID: selectedYearObject?.academicYearID,
          },
        ];
      } else {
        var parameters = [
          {
            studentID: studentProgressID?.studentProgressID?.studentId,
          },
          {
            academicYearID: selectedYearObject?.academicYearID,
          },
        ];
      }

      var result = await Get({
        parameters: parameters,
        ApiEndPoint: GETGATHADETAILSPERSTUDENT,
      });

      store.dispatch(changeProgress(40));
      if (result != undefined && result?.status === 200) {
        setGathaDetails(result?.data?.studentProgressDetailsReport);
        setGathaStats(result?.data?.studentProgressDetailsStatistics);
        setStudentSutraProfile(result?.data?.studentSutraProfile);
      }
      if (
        result?.data?.studentProgressDetailsReport?.length === 0 ||
        result?.data?.studentProgressDetailsStatistics?.length === 0
      ) {
        // toast.error("No data found", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      }

      store.dispatch(changeProgress(60));
    } catch (error) {
      toast.error(error.message);
    }
    store.dispatch(changeProgress(100));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  const UserRole = LocalUser?.roleName;
  useEffect(() => {
    GetStudentList();
  }, [studentProgressID]);

  const subjectList = [];
  const [selectSubject, setSelectSubject] = React.useState('');
  const handleSelectSubjectChange = (event) => {
    setSelectSubject(event.target.value);
  };

  return (
    <>
      <div
      //  className="d-flex justify-content-between align-items-center"
      >

        <div
          className="Form-Header"
          style={{
            marginTop: "-20px",
            marginLeft: "-13px",
            display: 'flex-wrap', // Display in a row
            alignItems: 'center', // Center vertically
            justifycontent: 'center'
          }}
        >
          Student Progress Details

          <div style={{ marginTop: '-10px', margin: '10px', marginLeft: "-10px", }}>
            <FormControl sx={{ m: 3, maxWidth: 'fit-content', margin: '10px', }} size="small">
              <InputLabel id="year-label">Academic Year</InputLabel>
              <Select
                labelId="year-label"
                label="Academic Year"
                value={selectYear}
                onChange={handleSelectYearChange}
                style={{ minWidth: isMobile ? '100%' : 'fit-content', maxWidth: 'fit-content' }} // Adjust width based on screen size
                MenuProps={{
                  anchorOrigin: {
                    vertical: isMobile ? 'bottom' : 'top', // Adjust positioning based on screen size
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                  getContentAnchorEl: null, // Prevents the menu from being cut off
                }}
              >
                {yearList?.map((selectednewyear, index) => (
                  <MenuItem key={index} value={selectednewyear?.academicYearName}>
                    {selectednewyear?.academicYearName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {UserRole === "Parent" &&
              // <FormControl sx={{ m: 3, 
              //   // maxWidth: 'fit-content',


              // margin:'10px'}} >
              //   {/* <InputLabel id="demo-controlled-open-select-label">Student</InputLabel> */}
              //   <InputLabel id="subject-label">
              //         Student
              //         </InputLabel>
              //   <Select
              //     labelId="subject-label"
              //     label="demo-controlled-open-select"
              //     value={selectedStudent}
              //     onChange={handleSelectSudentChange}
              //     style={{ minWidth: isMobile ? '100%' :  'fit-content', maxWidth: 'fit-content' }} 
              //     MenuProps={{
              //       anchorOrigin: {
              //         vertical: isMobile ? 'bottom' : 'top', 
              //         horizontal: 'left',
              //       },
              //       transformOrigin: {
              //         vertical: 'top',
              //         horizontal: 'left',
              //       },
              //       getContentAnchorEl: null, 
              //     }}
              //   >
              //     {studentData?.map((selectednewstudent, index) => (
              //       <MenuItem key={index} value={selectednewstudent?.fullName}>
              //         {selectednewstudent?.fullName}
              //       </MenuItem>
              //     ))}
              //   </Select>
              // </FormControl>


              <FormControl sx={{ m: 3, margin: '10px' }}>
                <InputLabel id="subject-label" sx={{ minWidth: '100px' }}>Student</InputLabel>
                <Select
                  labelId="subject-label"
                  label="demo-controlled-open-select"
                  value={selectedStudent}
                  onChange={handleSelectSudentChange}
                  sx={{
                    minWidth: '100px', // Set a minimum width for the Select component
                    maxWidth: 'fit-content',
                    '& .MuiSelect-select:focus': {
                      backgroundColor: 'transparent',
                    },
                    '& .MuiOutlinedInput-root': {
                      border: '1px solid #ccc', // You can customize the border style here
                    },
                  }}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: isMobile ? 'bottom' : 'top',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                    getContentAnchorEl: null,
                  }}
                >
                  {studentData.length === 0 && (
                    <MenuItem disabled> No students registered</MenuItem>
                  )}
                  {studentData?.map((selectednewstudent, index) => (
                    <MenuItem key={index} value={selectednewstudent?.fullName}>
                      {selectednewstudent?.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>





            }
          </div>
        </div>
        {/* <div
          className="Form-Header"
          style={{ marginTop: "-15px", marginLeft: "-10px" }}
        >
          Student Progress Details
        </div> */}

        {/* <div>
          {UserRole === "Parent" && (
            <FormControl sx={{ m: 3, minWidth: 120 }} size="small">
              <InputLabel id="demo-controlled-open-select-label">
                Select Student
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                label="Select Student"
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
                value={selectedStudent}
                onChange={handleSelectSudentChange}
                style={{ minWidth: 200 }}
              >
                {studentData?.map((selectednewstudent, index) => (
                  <MenuItem key={index} value={selectednewstudent?.fullName}>
                    {selectednewstudent?.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div> */}



        {/* <div>
          <FormControl sx={{ m: 3, minWidth: 120 }} size="small">
            <InputLabel id="demo-controlled-open-select-label">
              Academic Year
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              label="Academic Year"
              value={selectYear}
              onChange={handleSelectYearChange}
              style={{ minWidth: 200 }}
            >
              {yearList?.map((selectednewyear, index) => (
                <MenuItem key={index} value={selectednewyear?.academicYearName}>
                  {selectednewyear?.academicYearName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}



      </div>
      <span className="block border border-success PD"></span>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
          },
        }}
      >
        <Paper
          elevation={3}
          style={{ width: "100%", margin: "250x", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "15px",
            }}
          >
            <div>
              <b>Name : </b>

              <span style={{ marginLeft: "1px", marginRight: "5px" }}>
                {studentSutraProfile[0]?.studentName}
              </span>
            </div>
            <div>
              <b>School Grade :</b>
              <span style={{ marginLeft: "10px" }}>
                {studentSutraProfile[0]?.gradeName}
              </span>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12	col-sm-6 col-md-4	col-lg-4	col-xl-3	col-xxl-3">
                <Card
                  variant="outlined"
                  style={{
                    backgroundColor: "#b3e5fc",
                    margin: 3,
                  }}
                >
                  {card1}
                </Card>
              </div>
              <div className="col-12	col-sm-6 col-md-4	col-lg-4	col-xl-3	col-xxl-3">
                <Card
                  variant="outlined"
                  style={{
                    backgroundColor: "#69f0ae",
                    margin: 3,
                  }}
                >
                  {card2}
                </Card>
              </div>
              <div className="col-12	col-sm-6 col-md-4	col-lg-4	col-xl-3	col-xxl-3">
                <Card
                  variant="outlined"
                  style={{
                    backgroundColor: "#ffcdd2",
                    margin: 3,
                  }}
                >
                  {card3}
                </Card>
              </div>
              <div className="col-12	col-sm-6 col-md-4	col-lg-4	col-xl-3	col-xxl-3">
                <Card
                  variant="outlined"
                  style={{
                    backgroundColor: "#ffe0b2",
                    margin: 3,
                  }}
                >
                  {card4}
                </Card>
              </div>
            </div>
          </div>

          <div className="p-3">
            <MaterialReactTable
              columns={Columns}
              data={gathDetails}
              enableStickyHeader
              enableTopToolbar={false}
              initialState={{
                density: "compact",
              }}
            />
          </div>
        </Paper>
      </Box>
    </>
  );
}

export default StudentProgress;
