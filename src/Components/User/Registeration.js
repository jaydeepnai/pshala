import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Form from "../Master/Forms/Form";
import UserTabs from "../../BLL/Student/UserTabs";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { Email, PaymentMethodList } from "../../Common/Helper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PaymentMethodsDet } from "../../features/DDL/ListSlice";
import Get from "../../Data Repository/Get";
import { CURRENTYEAR } from "../../Data Repository/APIContstant";

function Registeration({ formik, Fields }) {
  const PaymentMethods = useSelector(PaymentMethodsDet);
  const [Students, setStudents] = useState([
    {
      id: 0,
      firstName: "",
      lastName: "",
      middleName: "",
      genderID: 3,
      classID: "",
      gradeID: "",
      email: "",
      cellPhone: "",
      UserType: "Student",
      Type: "Student",
    },
  ]);

  const storedData = JSON.parse(localStorage.getItem("Data"));
  // const initialAcademicYearName = storedData?.currentAcademicYearName || "defaultYear"; // Provide a default value if needed
  const initialAcademicYearName = storedData?.currentAcademicYearName;
  const [currentAcademicYearName, setCurrentAcademicYearName] = useState(
    initialAcademicYearName
  );
  const Navigate = useNavigate();
  const [IsSubmitForm, setIsSubmitForm] = useState(false);
  const [Academic, setAcademic] = useState("2023-2024");
  const [PaymentMethod, setPaymentMethod] = React.useState({
    Method: 0,
    ApplicableFees: Students.length * 100,
  });
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setPaymentMethod({
      ...PaymentMethod,
      ApplicableFees: Students.length * 100,
    });
  }, [Students]);

  useEffect(() => {
    getCurrentAcademicYear();
  }, []);

  // console.log(PaymentMethod)
  const handleChange = (event) => {
    setPaymentMethod({ ...PaymentMethod, Method: event.target.value });
  };

  const getCurrentAcademicYear = async () => {
    var result = await Get({ ApiEndPoint: CURRENTYEAR });

    if (result != undefined && result?.status === 200) {
      setCurrentYear(result?.data?.academicYearName);
      toast.success(result?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setCurrentYear("Default Year");
      toast.error("No Current Year found", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const [ValidateStudent, setValidateStudent] = useState(false);
  const [Gaurdians, setGaurdians] = useState([]);
  var GridType =
    "col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 cusPad";

  const SubmitRegistration = (e) => {
    e.preventDefault();
    if (formik.values.password == formik.values.ConfirmPassword) {
      setIsSubmitForm(true);
      setValidateStudent(!ValidateStudent);
      // console.log()
      formik.values.member_Address = {
        // memberID: 0,
        addressTypeID: 1,
        addressLine1: formik.values.addressLine1,
        addressLine2: formik.values.addressLine2,
        city: formik.values.city,
        stateID: formik.values.stateID,
        zipcode: String(formik.values.zipcode),
        isPrimary: true,
      };

      var GaurdiansIsValid = false;
      if (Gaurdians.length > 0) {
        Gaurdians?.map((g) => {
          g.cellPhone = String(g.cellPhone);
          if (
            g?.lastName == "" ||
            g?.lastName == undefined ||
            g?.firstName == "" ||
            g?.firstName == undefined ||
            g?.relationID == 0 ||
            g?.relationID == undefined

          ) {
            GaurdiansIsValid = false;
            toast.error("Please Check All the Tabs of Gaurdians");
            return;
          } else {
            delete g.Form;
            delete g.Submitting;
            delete g.TabName;
            delete g.UserType;
            delete g.TabType;
            GaurdiansIsValid = true;
          }
        });
        // console.log(GaurdiansIsValid)
      }

      var StudentIsValid = false;
      Students?.map((s) => {
        s.cellPhone = String(s.cellPhone);
        if (
          s?.lastName == "" ||
          s?.lastName == undefined ||
          s?.firstName == "" ||
          s?.firstName == undefined ||
          s?.genderID == 0 ||
          s?.genderID == undefined ||
          s?.gradeID == 0 ||
          s?.gradeID == undefined
        ) {
          toast.error("Please Check All the Tabs of Students");
          StudentIsValid = false;
          return;
        } else {
          delete s.Form;
          delete s.Submitting;
          delete s.TabName;
          delete s.UserType;
          delete s.TabType;
          StudentIsValid = true;
        }
      });

      if (StudentIsValid) {
        formik.values.studentRequest = Students;
      }

      if (PaymentMethod.Method != 0) {
        formik.values.registrationPaymentDetailsRequest = PaymentMethod;
      }

      formik.values.cellPhone = String(formik.values.cellPhone);
      var ParentObj = {
        firstName: formik.values.firstName,
        middleName: formik.values.middleName,
        lastName: formik.values.lastName,
        relationID: formik.values.relationID,
        email: formik.values.email,
        cellPhone: formik.values.cellPhone,
      };
      if (Gaurdians.length == 0) {
        formik.values.parentRequest = [ParentObj];
      } else if (GaurdiansIsValid) {
        formik.values.parentRequest = [ParentObj, ...Gaurdians];
      }
      debugger
      if (
        (StudentIsValid && GaurdiansIsValid && PaymentMethod.Method != "") ||
        (StudentIsValid &&
          Gaurdians.length == 0 &&
          GaurdiansIsValid == false &&
          PaymentMethod.Method != 0)
      ) {
        formik.values.Form = true;
        formik.handleSubmit();
      } else {
        formik.values.Form = false;
        formik.handleSubmit();
      }
    } else {
      toast.warning("Password & confirm password should be matched");
    }
    console.log(Gaurdians, "Form Data");
  };

  const Clear = () => {
    setGaurdians([]);
    formik.resetForm();
    setStudents([
      {
        id: 0,
        firstName: "",
        lastName: "",
        middleName: "",
        genderID: 3,
        gradeID: 0,
        classID: 0,
        email: "",
        cellPhone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        stateID: "",
        zipcode: "",
        UserType: "Student",
        Type: "Student",
      },
    ]);
  };

  const AddGaurdian = () => {

    setGaurdians([
      {
        id: 0,
        FirstName: "",
        LastName: "",
        MiddleName: "",
        Email: "",
        Phone: "",
        Relation: "",
        UserType: "Gardian",
        Type: "Student",
      },
    ]);
  };

  // console.log(Students)

  return (
    <div className="Form-Container form-bg">
      <div className="text-center mt-4 h3 WhiteSmokeText">
        <img
          src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
          alt="Logo"
          style={{ width: "10%", marginRight: "10px" }}
        />
        PathShala Registration
      </div>
      <form
        className="form registration-form"
        id="form1"
        onSubmit={SubmitRegistration}
      >
        <div className="Form-Header">
          Student Registration -{" "}
          {currentAcademicYearName ? currentAcademicYearName : currentYear}
        </div>
        <div className="Form-Body" style={{ marginRight: "35px" }}>
          <div className="col-md-6 d-flex align-items-end">
            <h5>User Details </h5>
          </div>
          <Form formik={formik} Fields={Fields} />

          <div style={{ display: "flex" }}>
            <div className="d-flex align-items-end m-2">
              <h5>Spouse/Gaurdians Details </h5>
            </div>
            {Gaurdians.length == 0 && (
              <IconButton className="AddTabs" onClick={AddGaurdian}>
                <AddIcon />
              </IconButton>
            )}
          </div>
          {Gaurdians.length > 0 && (
            <>
              <span class="block border border-success Divider"></span>
              <UserTabs
                Users={Gaurdians}
                setUsers={setGaurdians}
                ValidateStudent={ValidateStudent}
                setValidateStudent={setValidateStudent}
                TabType="Gaurdian"
              />
            </>
          )}
          <div className="col-md-6 d-flex align-items-end m-2">
            <h5>Student Details </h5>
          </div>
          <span class="block border border-success Divider"></span>
          <div style={{ paddingRight: 10 }}>
            <UserTabs
              Users={Students}
              setUsers={setStudents}
              ValidateStudent={ValidateStudent}
              setValidateStudent={setValidateStudent}
              TabType="Student"
            />
          </div>
          <div className="col-md-6 d-flex align-items-end m-2">
            <h5>Payment Details </h5>
          </div>
          <span class="block border border-success Divider"></span>
          <div class=" mt-3" style={{ marginRight: "20px", marginTop: "15px" }}>
            <div class="parent">
              <div className="row">
                <div className={`${GridType}`}>
                  <FormControl fullWidth>
                    <select
                      class="form-select"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={PaymentMethod.Method}
                      label="Payment Method"
                      error={IsSubmitForm && PaymentMethod.Method == 0}
                      onChange={handleChange}
                    >

                      <option value="">
                        <em>None</em>
                      </option>
                      {PaymentMethods?.length !== 0 && PaymentMethods?.map((m) => (
                        <option value={m.value}>{m.name}</option>
                      ))}
                    </select>
                  </FormControl>
                </div>

                <div className={`${GridType} `}>
                  <TextField
                    id="outlined-basic"
                    label="Applicable Fees"
                    variant="outlined"
                    size="small"
                    className="RgtAln"
                    defaultValue={PaymentMethod.ApplicableFees}
                    value={PaymentMethod.ApplicableFees}
                    readOnly
                    disabled
                    fullWidth
                  />
                </div>
              </div>
              <div className="col-2 d-flex align-items-center font fw-bold ml-2 "></div>
            </div>
          </div>
          <Button
            type="submit"
            size="large"
            className={`Register-Submit m-2 ${GridType}`}
            onClick={SubmitRegistration}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
          <Button
            type="button"
            size="large"
            className={`Register-Submit m-2 ${GridType}`}
            onClick={Clear}
            color="primary"
            variant="contained"
          >
            Clear
          </Button>
          <Button
            type="submit"
            size="large"
            className={`Register-Submit m-2 ${GridType}`}
            onClick={() => {
              Navigate("/login");
            }}
            color="primary"
            variant="contained"
          >
            Sign-In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Registeration;
