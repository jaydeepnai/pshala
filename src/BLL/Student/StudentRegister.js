import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'
import "bootstrap/dist/css/bootstrap.css";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Popover,
} from "@mui/material";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Autocomplete from '@mui/material/Autocomplete';
import { blue, green } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';

function StudentRegistration() {
    const [labelData, setLabelData] = useState("Registration 2023-2024");
    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [Parent, setParent] = useState({});
    const [showPassword, setShowPassword] = useState(true)
    const [showCPassword, setShowCPassword] = useState(false)
    const [ConfirmPassword, setConfirmPassword] = useState(null)
    const [selectedState, setSelectedState] = useState("");
    var gridtype = "col-xl-3 col-lg-4 col-sm-6 col-xs-12 std-fld";
    var STDGrid = "col-xl-3 col-lg-4 col-sm-6 col-xs-12 std-fld";
    const [Student, setStudent] = useState([
        {
            First_Name: "Aaronson",
            Middle_Name: "Aaron",
            Last_Name: " Mala",
            Pathshala_Class: "9",
            School_Grade: "9",
            Student_Email: "aaronson.mala@gmail.com",
            PhoneCell: "16105579185",
            Address_Line_1: "4 Waterbury Ln",
            Address_Line_2: "",
            City: "North Easton",
            State: "MA - Massachusetts",
            Zipcode: "02356-2564",
        },
        {
            First_Name: "Aaronian",
            Middle_Name: "Daisy",
            Last_Name: "Aim",
            Pathshala_Class: "7",
            School_Grade: "7",
            Student_Email: "Dai@gmail.com",
            PhoneCell: "6547675677",
            Address_Line_1: "13 Standish St",
            Address_Line_2: "",
            City: "Cambridge",
            State: "Gujrat",
            Zipcode: "01588-1437",
        },
    ]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleChange = (event) => {
        setSelectedGrade(event.target.value);
    };



    const gradeOptions = [
        { value: "", label: "Select Class/Grade", disabled: true },
        { value: "1", label: "Pre-K (3-4 Years)" },
        { value: "2", label: "Pre-K (4-5 Years)" },
        { value: "3", label: "KG" },
        { value: "4", label: "1" },
        { value: "5", label: " 2" },
        { value: "6", label: "3" },
        { value: "7", label: "4" },
        { value: "8", label: "5" },
        { value: "9", label: "6" },
        { value: "10", label: "7" },
        { value: "11", label: "8" },
        { value: "12", label: "9" },
        { value: "13", label: "10" },
        { value: "14", label: "11" },
        { value: "15", label: "12" },

    ];


    const classOptions = [
        { value: "", label: "Select Class/Grade", disabled: true },
        { value: "1", label: "Pre-K (3-4 Years)" },
        { value: "2", label: "Pre-K (4-5 Years)" },
        { value: "3", label: "KG" },
        { value: "4", label: "1st Grade" },
        { value: "5", label: " 2nd Grade" },
        { value: "6", label: "3rd Grade" },
        { value: "7", label: "4th Grade" },
        { value: "8", label: "5th and 6th grade" },
        { value: "9", label: " 7th and 8th grade " },
        { value: "10", label: "9th to 12th grade" },
    ];

    const stateOptions = [
        { value: "", label: "Select State", disabled: true },
    ];

    const stateList = [
        "Father",
        "Mother",
        "AZ - Arizona",
        "AR - Arkansas",
        "CA - California",
        "CO - Colorado",
        "CT - Connecticut",
        "DE - Delaware",
        "DC - District of Columbia",
        "FL - Florida",
        "GA - Georgia",
        "HI - Hawaii",
        "ID - Idaho",
        "IL - Illinois",
        "IN - Indiana",
        "IA - Iowa",
        "KS - Kansas",
        "KY - Kentucky",
        "LA - Louisiana",
        "ME - Maine",
        "MD - Maryland",
        "MA - Massachusetts",
        "MI - Michigan",
        "MN - Minnesota",
        "MS - Mississippi",
        "MO - Missouri",
        "MT - Montana",
        "NE - Nebraska",
        "NV - Nevada",
        "NH - New Hampshire",
        "NJ - New Jersey",
        "NM - New Mexico",
        "NY - New York",
        "NC - North Carolina",
        "ND - North Dakota",
        "OH - Ohio",
        "OK - Oklahoma",
        "OR - Oregon",
        "PA - Pennsylvania",
        "RI - Rhode Island",
        "SC - South Carolina",
        "SD - South Dakota",
        "TN - Tennessee",
        "TX - Texas",
        "UT - Utah",
        "VT - Vermont",
        "VA - Virginia",
        "WA - Washington",
        "WV - West Virginia",
        "WI - Wisconsin",
        "WY - Wyoming"

    ];

    for (let i = 1; i <= stateList.length; i++) {
        stateOptions.push({ value: i.toString(), label: stateList[i - 1] });
    }



    const Tab = styled.button`
    font-size: 20px;
    padding: 10px 60px;
    cursor: pointer;
    opacity: 0.6;
    background: white;
    border: 0;
    outline: 0;
    ${({ active }) =>
            active &&
            `
    border-bottom: 2px solid black;
    opacity: 1;
  `}
  `;
    const ButtonGroup = styled.div`
    display: flex;
  `;

    // const types = ["Student1", "Student2"];

    const [types, setTypes] = useState(['Aaronson', 'Aaron',]);
    const [active, setActive] = useState(types[0]);
    const [showDetails, setShowDetails] = useState(true);
    const [NewStudent, setNewStudent] = useState({});

    const handleCheckboxChange = () => {
        setShowDetails(!showDetails);
    };

    const fetchData = async () => {
        const parentData = {
            FirstName: "Aaron",
            LastName: "Cynthia",
            Email: "aaron.cynthia@gmail.com",
            AddressLine1: "145 Grosvenor Ave",
            City: "Pawtucket",
            ZipCode: "01588-1437",
        }


        setParent(parentData);
        setStudent(Student);
    };

    // const studentData = ;
    const handleStudentClick = (index) => {
        setSelectedStudent(Student[index]);
    };

    const handleAddNewData = () => {
        setTypes([...types, 'New Student']);
        setStudent([...Student, {
            First_Name: "",
            Middle_Name: "",
            Last_Name: "",
            Pathshala_Class: "",
            School_Grade: "",
            Student_Email: "",
            PhoneCell: "",
            Address_Line_1: "",
            Address_Line_2: "",
            City: "",
            State: "MA",
            Zipcode: "01966-1117 ",
        },])

    };



    const Students = [
        // { label: 'The Shawshank Redemption', year: 1994 },
        {
            id: '1',
            firstName: 'Aase, Karen S',
            lastname: '',
            class: 'a',
            previous: 77,
            fees: 100,
            current: 50,
            dues: 50
        },
        {
            id: '2',
            firstName: 'nikhil',
            lastname: 'nikam',
            class: 'a',
            fees: 100,
            previous: 77,
            current: 50,
            dues: 50
        },
        {
            id: '3',
            firstName: 'nirali',
            lastname: 'kothari',
            class: 'a',
            fees: 100,
            current: 50,
            previous: 77,
            dues: 50
        },
        {
            id: '4',
            firstName: 'sagar',
            lastname: 'Modi',
            class: 'a',
            fees: 100,
            current: 50,
            previous: 77,
            dues: 50
        },
        {
            id: '5',
            firstName: 'hinal',
            lastname: 'arya',
            class: 'a',
            fees: 100,
            current: 50,
            previous: 77,
            dues: 50
        },
        {
            id: '6',
            firstName: 'jesal',
            lastname: 'kahndelwal',
            class: 'a',
            fees: 100,
            current: 50,
            previous: 77,
            dues: 50
        },
    ]


    const defaultProps = {
        options: Students,
        getOptionLabel: (option) => {
            // console.log(option)
            // console.log(NewStudent)
            if (option?.firstName == undefined)
                return "Add new student."
            else
                return option?.firstName + ' ' + option?.lastname
        }
    };


    // console.log(selectedStudent)
    // console.log(Student)

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='Form-Container form-bg'>
            <div className='text-center mt-4 h3 WhiteSmokeText'>
                <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Logo"
                    style={{ width: "10%", marginRight: "10px" }}
                />
                PathShala Registration
            </div>
            <form className='form registration-form'>
                <div className='Form-Header'>
                    Registration : 2023-2024
                </div>
                <div className='Form-Body'>
                    <div className="parent container pt-1 pb-1  mt-2 my-2  text-dark rounded">
                        <div className="col-md-6 d-flex align-items-end">
                            <h5>User Details </h5>
                        </div>
                        <div className="border border-success"></div>
                        <div class=" mt-3">
                            <div class="parent">
                                <div className="row">

                                    <div className={` ${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="First Name *"
                                            variant="outlined"
                                            size="small"
                                            // value={Parent.FirstName}
                                            readOnly
                                            fullWidth
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Last Name *"
                                            variant="outlined"
                                            size="small"
                                            //value={"Mest"}
                                            readOnly
                                            fullWidth
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Middle Name *"
                                            variant="outlined"
                                            size="small"
                                            //value={"S"}
                                            readOnly
                                            fullWidth
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <FormControl
                                            variant="outlined"
                                            className="w-100"
                                            size="small"
                                        >
                                            <InputLabel id="Relation">
                                                Relation with kid  *
                                            </InputLabel>
                                            <Select
                                                labelId="Relation"
                                                id="State"
                                                value={1}
                                                label="Relation with Kid"
                                                // onChange={handleChange} 
                                                // onChange={(event) => setSelectedState(event.target.value)}
                                                fullWidth
                                            >
                                                <MenuItem
                                                    value={1}
                                                >
                                                    Father
                                                </MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>


                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Email *"
                                            variant="outlined"
                                            size="small"
                                            //value={Parent.Email}
                                            readOnly
                                            fullWidth
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Mobile *"
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            //value={12788876543}
                                            readOnly
                                            fullWidth
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Address Line1 "
                                            variant="outlined"
                                            size="small"
                                            //value={Parent.AddressLine1
                                            // }

                                            fullWidth
                                        />
                                    </div>

                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Address Line2 "
                                            variant="outlined"
                                            size="small"
                                            //value={"Green acres"}

                                            fullWidth
                                        />
                                    </div>

                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="City *"
                                            variant="outlined"
                                            size="small"
                                            //value={Parent.City}

                                            fullWidth
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <FormControl
                                            variant="outlined"
                                            className="w-100"
                                            size="small"
                                        >
                                            <InputLabel id="State">
                                                State *
                                            </InputLabel>
                                            <Select
                                                labelId="State"
                                                id="State"
                                                //value={selectedState}
                                                label="State"
                                                // onChange={handleChange} 
                                                onChange={(event) => setSelectedState(event.target.value)}
                                                fullWidth
                                            >
                                                {stateOptions?.map((option) => (
                                                    <MenuItem
                                                        key={option.value}
                                                        //value={option.value}
                                                        disabled={option.disabled}
                                                    >
                                                        {option.label}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                    </div>


                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="ZipCode"
                                            variant="outlined"
                                            size="small"
                                            //value={Parent.ZipCode}

                                            fullWidth
                                        />
                                    </div>


                                    <div className={`${gridtype}`}>
                                        <TextField
                                            id="outlined-basic"
                                            label="JCNJID"
                                            variant="outlined"
                                            size="small"
                                            //value={12325}
                                            fullWidth
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <TextField
                                            //  sx={{ m: 2, minWidth: 220,}}
                                            id={"outlined-basic"}
                                            autoComplete={"name"}
                                            name={"nikhil"}
                                            label={"password"}
                                            variant="outlined"
                                            size="small"
                                            //value={"aaron10"}
                                            //   key={"name"}
                                            //  margin="normal"
                                            fullWidth
                                            placeholder={"password"}
                                            // value={formik.values["name"]}
                                            // onChange={formik.handleChange}
                                            type={showPassword ? "text" : "password"}
                                            // onBlur={formik.handleBlur}
                                            // error={formik.errors["name"] && formik.touched["name"]}
                                            // helperText={formik.errors["name"] && formik.touched["name"] ? (
                                            //     <div className="input-feedback">{formik.errors["name"]}</div>
                                            // ) : id.helperText}
                                            tabIndex={1}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" >

                                                        <IconButton
                                                            disableFocusRipple // Prevent focus ripple effect
                                                            disableRipple // Prevent click ripple effect
                                                        //   onClick={handleClickShowPassword}
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className={`${gridtype}`}>
                                        <TextField
                                            //  sx={{ m: 2, minWidth: item.width }}
                                            //  id="outlined-helperText"
                                            id={"outlined-basic"}
                                            label="Confirm Password"
                                            type={showCPassword ? "text" : "password"}
                                            variant="outlined"
                                            size="small"
                                            //value={"aaron@1234"}
                                            fullWidth
                                            //  onBlur={(e) => { CheckConfirmPassword(e.target.value) }}
                                            //  helperText="Retype your password"
                                            error={ConfirmPassword == null ? false : ConfirmPassword}
                                            tabIndex={2}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            tabIndex={-1}
                                                            onClick={() => { setShowCPassword(!showCPassword); }}
                                                        >
                                                            {showCPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </div>

                                </div >
                            </div>
                            <div className='col-2 d-flex align-items-center font fw-bold ml-2 '>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="parent container pt-1 pb-1  mt-2 my-2  text-dark rounded">
                    <div className="col-md-12 d-flex align-items-end justify-content-between">
                        <h5>Spouse/Gaurdians Details </h5>
                        <IconButton sx={{ color: green[500], bgcolor: '#cffcd2', marginBottom: 1 }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className="border border-success"></div>
                    <ButtonGroup>
                        {types?.map((type, index) => (
                            <Tab
                                key={type}
                                active={active === type}
                                size="small"
                                onClick={() => {
                                    setActive(type);
                                    handleStudentClick(index); // Set the selected student based on the index
                                    // console.log(index)
                                }}
                            >
                                {type}
                            </Tab>
                        ))}

                    </ButtonGroup>
                    <div class=" mt-3">
                        <div class="parent">
                            <div className="row">

                                <div className={` ${gridtype}`}>
                                    <TextField
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        size="small"
                                        // value={""}
                                        readOnly
                                        fullWidth
                                    />
                                </div>
                                <div className={`${gridtype}`}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Last Name"
                                        variant="outlined"
                                        size="small"
                                        //value={""}
                                        readOnly
                                        fullWidth
                                    />
                                </div>
                                <div className={`${gridtype}`}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Middle Name"
                                        variant="outlined"
                                        size="small"
                                        //value={""}
                                        readOnly
                                        fullWidth
                                    />
                                </div>
                                <div className={`${gridtype}`}>
                                    <FormControl
                                        variant="outlined"
                                        className="w-100"
                                        size="small"
                                    >
                                        <InputLabel id="Relation">
                                            Relation with kid  *
                                        </InputLabel>
                                        <Select
                                            labelId="Relation"
                                            id="State"
                                            value={1}
                                            label="Relation with Kid"
                                            // onChange={handleChange} 
                                            // onChange={(event) => setSelectedState(event.target.value)}
                                            fullWidth
                                        >
                                            <MenuItem
                                                value={1}
                                            >
                                                Mother
                                            </MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>


                                <div className={`${gridtype}`}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        size="small"
                                        //value={""}
                                        readOnly
                                        fullWidth
                                    />
                                </div>
                                <div className={`${gridtype}`}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Mobile"
                                        variant="outlined"
                                        size="small"
                                        type="number"
                                        //value={""}
                                        readOnly
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className='col-2 d-flex align-items-center font fw-bold ml-2 '>

                            </div>
                        </div>
                    </div>
                </div>

                <>
                    <div className="col-12 mt-3" style={{ marginLeft: "10px" }}>
                        <div className="d-flex align-items-center justify-content-between">
                            {/* <div className="d-flex align-items-center">
                                    <Autocomplete
                                        {...defaultProps}
                                        disablePortal
                                        id="combo-box-demo"
                                        options={Students}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Add new student"
                                            renderPopover={(params) => (
                                                <Popover
                                                    sx={{ height: "10px" }}
                                                    style={{ height: "10px" }}
                                                    {...params.popperProps}
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    }}
                                                // style={popoverStyle}
                                                >
                                                    {params.children}
                                                </Popover>
                                            )}
                                        />}
                                    />
                                    <IconButton sx={{ color: green[500], bgcolor: '#cffcd2', marginLeft: 2 }}
                                    // onClick={AddStudent}
                                    >
                                        <DownloadDoneIcon />
                                    </IconButton>
                                </div>
                                <div className='col-2 d-flex align-items-center font fw-bold ml-2 AddSTD'>
                                </div> */}
                        </div>
                    </div>

                    <div className="parent container pt-1 pb-1  mt-2 my-2  text-dark rounded">
                        <div className="col-md-6 d-flex align-items-end">
                            <h5>Kids Details </h5>
                        </div>
                        <div className="border border-success"></div>

                        {showDetails && (
                            <>
                                <div className="d-flex justify-content-between">
                                    <ButtonGroup>
                                        {types?.map((type, index) => (
                                            <Tab
                                                key={type}
                                                active={active === type}
                                                size="small"
                                                onClick={() => {
                                                    setActive(type);
                                                    handleStudentClick(index); // Set the selected student based on the index
                                                    // console.log(index)
                                                }}
                                            >
                                                {type}
                                            </Tab>
                                        ))}

                                    </ButtonGroup>

                                    {/* <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<AddIcon />}
                                            onClick={handleAddNewData}
                                            style={{
                                                height: "39px",
                                                marginTop: "14px"
                                            }}
                                        >
                                            Add New Kid
                                        </Button> */}
                                    <IconButton sx={{ color: green[500], bgcolor: '#cffcd2', marginTop: 1 }}>
                                        <AddIcon />
                                    </IconButton>
                                </div>

                                {selectedStudent && (
                                    <div className="parent container pt-1 pb-1  mt-2 my-2  text-dark rounded">
                                        <div className="row">
                                            <div className={`${STDGrid}`}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="First Name"
                                                    variant="outlined"
                                                    size="small"
                                                    //value={"John"}
                                                    fullWidth
                                                />
                                                {
                                                    // console.log(selectedStudent.First_Name)
                                                }
                                            </div>
                                            <div className={` ${STDGrid}`}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Middle Name"
                                                    variant="outlined"
                                                    size="small"
                                                    //value={"Wick"}
                                                    readOnly
                                                    fullWidth
                                                />
                                            </div>
                                            <div className={` ${STDGrid}`}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Last Name"
                                                    variant="outlined"
                                                    size="small"
                                                    //value={"Jonatham"}
                                                    fullWidth
                                                />
                                            </div>


                                            <div className={` ${STDGrid}`}>
                                                <FormControl
                                                    variant="outlined"
                                                    className="w-100"
                                                    size="small"
                                                >
                                                    <InputLabel id="Pathshala_Class">
                                                        Gender
                                                    </InputLabel>
                                                    <Select
                                                        labelId="Pathshala_Class"
                                                        id="Pathshala_Class"
                                                        value={1}
                                                        label="Gender"
                                                        // onChange={(event) => setSelectedClass(event.target.value)}
                                                        fullWidth
                                                    >
                                                        <MenuItem
                                                            value={1}
                                                        >
                                                            Male
                                                        </MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </div>




                                            <div className={` ${STDGrid}`}>
                                                <FormControl
                                                    variant="outlined"
                                                    className="w-100"
                                                    size="small"
                                                >
                                                    <InputLabel id="School_Grade">
                                                        School Grade
                                                    </InputLabel>
                                                    <Select
                                                        labelId="School_Grade"
                                                        id="School_Grade"
                                                        //value={selectedGrade}
                                                        label="School_Grade"
                                                        onChange={handleChange} fullWidth
                                                    >
                                                        {gradeOptions?.map((option) => (
                                                            <MenuItem
                                                                key={option.value}
                                                                value={option.value}
                                                                disabled={option.disabled}
                                                            >
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </div>




                                            <div className={` ${STDGrid}`}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Student Email"
                                                    variant="outlined"
                                                    size="small"
                                                    //value={"John@wick.com"}
                                                    fullWidth
                                                />
                                            </div>
                                            <div className={` ${STDGrid}`}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Phone Cell"
                                                    variant="outlined"
                                                    size="small"
                                                    //value={selectedStudent.PhoneCell}
                                                    fullWidth
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </>
                        )}
                    </div>

                </>

                <div className="parent container pt-1 pb-1  mt-2 my-2  text-dark rounded">
                    <div className="col-md-12 d-flex align-items-end justify-content-between">
                        <h5>Payment Details </h5>
                        <IconButton sx={{ color: green[500], bgcolor: '#cffcd2', marginBottom: 1 }}>
                            <AddIcon />
                        </IconButton>
                    </div>
                    <div className="border border-success"></div>
                    <div class=" mt-3">
                        <div class="parent">
                            <div className="row">

                                <div className={`${gridtype}`}>
                                    <FormControl
                                        variant="outlined"
                                        className="w-100"
                                        size="small"
                                    >
                                        <InputLabel id="Relation">
                                            Payment Method
                                        </InputLabel>
                                        <Select
                                            labelId="Relation"
                                            id="State"
                                            value={1}
                                            label="Payment Method"
                                            fullWidth
                                        >
                                            <option value={1}>Check</option>
                                        </Select>
                                    </FormControl>
                                </div>


                                <div className={`${gridtype}`}>
                                    <TextField
                                        id="outlined-basic"
                                        label="Applicable Fees"
                                        variant="outlined"
                                        size="small"
                                        // value={"200"}
                                        readOnly
                                        fullWidth
                                    />
                                </div>
                            </div>
                            <div className='col-2 d-flex align-items-center font fw-bold ml-2 '>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="check-box container  pt-0 pb-1  mt-1 my-1   text-dark rounded ">
                    <div className="col-md-6 d-flex align-items-end">
                        <div className="d-flex pt-0 pb-2 align-items-center justify-content-center">

                        </div>
                    </div>
                    <div className="col-md-6 d-flex align-items-end">
                        <Button variant="contained" type="submit" className=" pb-1 mt-1">
                            Register
                        </Button>
                    </div>
                </div>
            </form >
        </div >
        // <form>
        //     <h2 className="mb-0 pb-0 pb-md-0 mb-md-0 pt-mt-1">
        //         <span className="fw-bold">Path</span>shala Student Registration
        //     </h2>


        // </form>
        //     </div >
        // </div >
    );
}

export default StudentRegistration;
