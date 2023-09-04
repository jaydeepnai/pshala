import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { ParentDefaultValue, Fields, ParentSchema } from "../User/Form/Registration/FormOptions";
import { useFormik } from "formik";
import Registeration from "../../Components/User/Registeration";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GenderListsDet, List, RelationsDet, SchoolGradesDet, StatesDet } from "../../features/DDL/ListSlice";
import Post from "../../Data Repository/Post";
import { CREATE_REGISTRATION } from "../../Data Repository/APIContstant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentRegistrationC() {
    const navigate = useNavigate()

    const OnSubmit = async (values) => {
        if (values.Form) {
            var Registration = {
                jcnjid: String(values.jcnjid),
                password: values.password,
                email: values.email,
                cellPhone: values.cellPhone,
                member_Address: values.member_Address,
                parentRequest: values.parentRequest,
                studentRequest: values.studentRequest,
                registrationPaymentDetailsRequest: {
                    paymentTypeID: values.registrationPaymentDetailsRequest.Method,
                    amount: values.registrationPaymentDetailsRequest.ApplicableFees
                }
            }
            var result = await Post({ parameters: Registration, ApiEndPoint: CREATE_REGISTRATION })
            if (result?.status == 200) {
                toast.success(
                    result?.data
                )
                navigate("/login")
            }
            else {
                toast.error(
                    result?.data
                )
            }
        }
    }

    const Relations = useSelector(RelationsDet)
    const States = useSelector(StatesDet)
    const DDLList = useSelector(List)

    var GridType = "col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12";
    var TextWidth = 220

    const [ParemntFields, setParemntFields] = useState()

    // console.log(States)

    const formik = useFormik({
        initialValues: ParentDefaultValue,
        onSubmit: OnSubmit,
        validationSchema: ParentSchema
    });

    useEffect(() => {
        if (
            States?.length !== 0 && States !== undefined &&
            Relations?.length !== 0 && Relations !== undefined
        ) {
            setParemntFields({
                blocks: [{
                    fld: [{
                        "name": "firstName",
                        "label": "First Name*",
                        "type": "text",
                        "id": "FirstName",
                        "placeHolder": "First Name",
                        "helperText": "Your First Name",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "middleName",
                        "label": "Middle Name",
                        "type": "text",
                        "id": "MiddleName",
                        "placeHolder": "Middle Name",
                        "helperText": "Your Middle Name",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "lastName",
                        "label": "Last Name*",
                        "type": "text",
                        "id": "LastName",
                        "placeHolder": "Last Name",
                        "helperText": "Your Last Name",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "label": "Relationship With Student*",
                        "name": "relationID",
                        "type": "DDL",
                        "id": "Relation",
                        "placeHolder": "Relation",
                        "helperText": "Your Relation",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth,
                        "elm": Relations,
                    },
                    {
                        "name": "email",
                        "label": "Email*",
                        "type": "email",
                        "id": "Email",
                        "placeHolder": "Email ID",
                        "helperText": "Your Email ID",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "cellPhone",
                        "label": "Phone Number*",
                        "type": "phone",
                        "id": "Mobile",
                        "placeHolder": "Mobile",
                        "helperText": "Your Mobile",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "addressLine1",
                        "label": "Address Line 1*",
                        "type": "text",
                        "id": "AddressLine1",
                        "placeHolder": "Address Line 1",
                        "helperText": "Your Address Line",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "addressLine2",
                        "label": "Address Line 2",
                        "type": "text",
                        "id": "AddressLine2",
                        "placeHolder": "Address Line 2",
                        "helperText": "Your Address Line",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "city",
                        "label": "City*",
                        "type": "text",
                        "id": "City",
                        "placeHolder": "City",
                        "helperText": "Your City",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "stateID",
                        "label": "Select State*",
                        "type": "DDL",
                        "id": "State",
                        "placeHolder": "State",
                        "helperText": "Your State",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth,
                        "elm": States,
                    },
                    {
                        "label": "Zip Code",
                        "name": "zipcode",
                        "type": "text",
                        "id": "ZipCode",
                        "placeHolder": "Zip Code",
                        "helperText": "Your Zip Code",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        "name": "jcnjid",
                        "label": "JCNJ ID",
                        "type": "text",
                        "id": "JCNJMemberID",
                        "placeHolder": "JCNJMemberID",
                        "helperText": "Your JCNJMemberID",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    {
                        name: "password",
                        label: "Password *",
                        type: "password&confirmPassword",
                        id: "Passsword",
                        placeHolder: "Password",
                        show: false,
                        helperText: "Your Password",
                        GridName: GridType,
                        Classes: "m-1",
                        width: TextWidth,
                    },
                    ]
                },
                ],
                ActionButton: [{
                    btn: []
                },],
            })
        }
    }, [States, Relations])


    // formik.validateForm

    return (
        <>
            {/* <Signup formik={formik} Fields={Fields} /> */}
            <Registeration formik={formik} Fields={ParemntFields} />
        </>
    )

}

export default StudentRegistrationC;
