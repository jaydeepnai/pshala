import { useFormik } from "formik";
import StudentForm from "./TabForm";
import { GaurdianSchema, StudentSchema, studentOnSubmit } from "../User/Form/Registration/FormOptions";
import Tab from '@mui/material/Tab';
import { useEffect } from "react";
import TabForm from "./TabForm";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { GenderListsDet, List, RelationsDet, SchoolGradesDet } from "../../features/DDL/ListSlice";

function UserTab({ item, Users, i, setUsers, TabType, ValidateStudent, setValidateStudent }) {
    const GenderLists = useSelector(GenderListsDet)
    const SchoolGrades = useSelector(SchoolGradesDet)
    const Relations = useSelector(RelationsDet)
    const DDLList = useSelector(List)

    var GridType = "col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12";
    var TextWidth = 220
    const [StudentFields, setStudentFields] = useState()

    const [GaurdianFields, setGaurdianFields] = useState()

    const [UserDefaultValue, setUserDefaultValue] = useState(TabType === "Student" ? {
        id: item?.id,
        UserType: TabType,
        firstName: item.firstName,
        lastName: item.lastName,
        middleName: item.middleName,
        genderID: item.genderID,
        gradeID: item.gradeID,
        email: item.email,
        cellPhone: item.cellPhone,
        Form: false,
        Submitting: false
    } : {
        id: item?.id,
        UserType: TabType,
        firstName: item.firstName,
        middleName: item.middleName,
        lastName: item.lastName,
        relationID: item.relationID,
        email: item.email,
        cellPhone: item.cellPhone,
        Form: false,
        Submitting: false
    })

    const formik = useFormik({
        initialValues: UserDefaultValue,
        onSubmit: studentOnSubmit,
        validationSchema: TabType === "Student" ? StudentSchema : GaurdianSchema
    });

    useEffect(() => {
        if (
            SchoolGrades?.length !== 0 && SchoolGrades !== undefined &&
            GenderLists?.length !== 0 && GenderLists !== undefined
        ) {
            setStudentFields({
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
                        "helperText": "Your middle Name",
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
                        "name": "genderID",
                        "label": "Select Gender*",
                        "type": "DDL",
                        "id": "Gender",
                        "placeHolder": "Gender",
                        "helperText": "Your Gender",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth,
                        "elm": GenderLists,
                    },
                    {
                        "name": "gradeID",
                        "label": "Select Grade*",
                        "type": "DDL",
                        "id": "SchoolGrade",
                        "placeHolder": "SchoolGrade",
                        "helperText": "School Grade",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth,
                        "elm": SchoolGrades,
                    },
                    {
                        "name": "email",
                        "label": "Email",
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
                        "label": "Phone Number",
                        "type": "phone",
                        "id": "Phone",
                        "placeHolder": "Phone",
                        "helperText": "Phone",
                        "GridName": GridType,
                        "Classes": "m-1",
                        "width": TextWidth
                    },
                    ]
                },],
                ActionButton: [{
                    btn: [
                        {
                            "name": "Register",
                            "id": "Register",
                            "helperText": "To Register in PathShala",
                            "GridName": GridType,
                            "Classes": "m-1",
                            "type": "Button",
                            "buttonType": "Submit",
                            "GridsName": GridType,
                            "minWidth": 200,
                            "margin": 3,
                            "size": "large"
                        },
                    ]
                },],
            })
            setGaurdianFields({
                blocks: [{
                    fld: [
                        {
                            "name": "relationID",
                            "label": "Relationship With Student*",
                            "type": "DDL",
                            "id": "Relation",
                            "placeHolder": "Relation",
                            "helperText": "Your Relation",
                            "GridName": GridType,
                            "Classes": "m-1",
                            "width": TextWidth,
                            "elm": Relations,
                        }, {
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
                            "helperText": "Your middle Name",
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
                            "name": "email",
                            "label": "Email",
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
                            "label": "Phone Number",
                            "type": "phone",
                            "id": "Phone",
                            "placeHolder": "Phone",
                            "helperText": "Phone",
                            "GridName": GridType,
                            "Classes": "m-1",
                            "width": TextWidth
                        },
                    ]
                },],
                ActionButton: [{
                    btn: [
                    ]
                },],
            })
        }
    }, [SchoolGrades, GenderLists])

    useEffect(() => {
        formik.handleSubmit()
    }, [ValidateStudent])


    useEffect(() => {
        if (Object.keys(formik.values).length !== 0) {
            if (TabType === "Student") {
                formik.resetForm({
                    id: item?.id,
                    UserType: TabType,
                    firstName: item.firstName,
                    lastName: item.lastName,
                    middleName: item.middleName,
                    genderID: item.genderID,
                    gradeID: item.gradeID,
                    email: item.email,
                    cellPhone: item.cellPhone,
                    Form: false,
                    Submitting: false
                })
            }
            else if (TabType === "Gaurdian") {
                formik.resetForm({
                    id: item?.id,
                    UserType: TabType,
                    firstName: item.firstName,
                    middleName: item.middleName,
                    lastName: item.lastName,
                    relationID: item.relationID,
                    email: item.email,
                    Mobile: item.Mobile,
                    Form: false,
                    Submitting: false
                })
            }
        }
    }, [])


    useEffect(() => {
        if (Object.keys(formik.values).length !== 0) {
            const index = Users.findIndex(elm => elm.id === item.id);
            Users[index] = formik.values
            setUsers([...Users])
        }
    }, [formik.values])

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <TabForm Fields={TabType === "Student" ? StudentFields : GaurdianFields} formik={formik} />
            </form>
        </>
    )
}

export default UserTab