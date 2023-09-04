import * as Yup from "yup";
import { Email, GenderList, GradeOptions, Password, RelationList, StateList } from "../../../../Common/Helper";


const ParentDefaultValue = {
    firstName: "",
    middleName: "",
    lastName: "",
    relationID: "",
    email: "",
    cellPhone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    stateID: 31,
    zipcode: "",
    jcnjid: "",
    password: "",
    Form: false,
    Submitting: false
}

const PaymentDefaultValue = {
    paymentTypeID: "",
    amount: "",
    Form: false,
    Submitting: false
}

const GaurdianDefaultValue = {
    firstName: '',
    middleName: '',
    lastName: '',
    relationID: "",
    email: '',
    cellPhone: "",
    Form: false,
    Submitting: false
}

const StudentDefaultValue = {
    firstName: '',
    lastName: '',
    middleName: '',
    classID: "",
    gradeID: '',
    email: '',
    genderID: '',
    cellPhone: "",
    Form: false,
    Submitting: false
}


const studentOnSubmit = async (values, navigate) => {
}

var PhoneRegExp = /^[0-9]{7,}$/;
var Name = /^[A-Za-z\s]+$/;

const ParentSchema = Yup.object().shape({
    firstName: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("FirstName should not be empty"),
    lastName: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("LastName should not be empty"),
    relationID: Yup.number().required("Please select One of them").test((value, ctx) => { if (value === 0) { return false; } else return true }),
    email: Yup.string().matches(Email, 'Enter valid email Adress').required("Please enter email address."),
    cellPhone: Yup.string().matches(PhoneRegExp, 'Enter valid Phone Number').required("Please enter Phone."),
    addressLine1: Yup.string().required("Please ent er AddressLine."),
    city: Yup.string().required("Please enter City"),
    stateID: Yup.number().required("Please select One of them").test((value, ctx) => { if (value === 0) { return false; } else return true }),
    zipcode: Yup.number(),
    jcnjid: Yup.string(),
    password: Yup.string().matches(Password, "It should have 1 Uppercase,Lowercase,Number & Special Chars").required("Please fill the password")
});

const StudentSchema = Yup.object().shape({
    firstName: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("FirstName should not be empty"),
    lastName: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("LastName should not be empty"),
    gradeID: Yup.number().required("Please select One of them").test((value, ctx) => { if (value === 0) { return false; } else return true }),
    genderID: Yup.number().required("Please select One of them").test((value, ctx) => { if (value === 0) { return false; } else return true }),
});

const GaurdianSchema = Yup.object().shape({
    firstName: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("FirstName should not be empty"),
    lastName: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("LastName should not be empty"),
    relationID: Yup.number().required("Please select One of them").test((value, ctx) => { if (value === 0) { return false; } else return true }),
    // email: Yup.string().matches(Email, 'Enter valid email Adress'),
    // cellPhone: Yup.string().min(10, "Need atleast 10 digits").matches(PhoneRegExp, 'Phone number is not valid'),
})



export { ParentDefaultValue, StudentDefaultValue, ParentSchema, StudentSchema, studentOnSubmit, GaurdianSchema, GaurdianDefaultValue }