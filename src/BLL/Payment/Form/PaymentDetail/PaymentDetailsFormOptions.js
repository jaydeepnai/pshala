import * as Yup from "yup";

const ParentDefaultValue = {
    FullName: "",
    Email: "",
    State: "",
    City: "",
    Form: false,
    Submitting: false
}

const ParentOnSubmit = async (values) => {
}

var Name = /^[A-Za-z]+$/;
var EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


const ParentSchema = Yup.object().shape({
    FullName: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("FirstName should not be empty"),
    Email: Yup.string().matches(EmailRegex, 'Enter valid email Adress').required("Please enter a valid email address."),
    State: Yup.string().required("Please select One of them").test((value, ctx) => { if (value == "") { return false; } return true; }),
    City: Yup.string().matches(Name, 'Special char, Numbers are not allowed').required("FirstName should not be empty"),
});
var GridType = "col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12";
var TextWidth = 220

const ParentFields = {
    blocks: [{
        fld: [{
            "name": "FullName",
            "type": "text",
            "id": "FirstName",
            "placeHolder": "First Name",
            "helperText": "Your First Name",
            "GridName": GridType,
            "Classes": "m-1",
            "width": TextWidth
        },
        {
            "name": "Email",
            "type": "email",
            "id": "Email",
            "placeHolder": "Email ID",
            "helperText": "Your Email ID",
            "GridName": GridType,
            "Classes": "m-1",
            "width": TextWidth
        },
        {
            "name": "State",
            "type": "text",
            "id": "State",
            "placeHolder": "State",
            "helperText": "Your State",
            "GridName": GridType,
            "Classes": "m-1",
            "width": TextWidth,
            "elm": [
                {
                    "name": "Check",
                    "label": "Check",
                    "value": "Check"
                },
                {
                    "name": "Credit Card Payment",
                    "label": "Credit Card Payment",
                    "value": "CreditCardPayment"
                },
                {
                    "name": "Zelle",
                    "label": "Zelle",
                    "value": "Zelle"
                }
            ],
        }, {
            "name": "City",
            "type": "text",
            "id": "City",
            "placeHolder": "City",
            "helperText": "Your City",
            "GridName": GridType,
            "Classes": "m-1",
            "width": TextWidth
        },
        ]
    },
    ],
    ActionButton: [{
        btn: [
            //     {
            //     "name": "Sign Up",
            //     "id": "SignUp",
            //     "helperText": "To sign up in PathShala",
            //     "GridName": GridType,
            //     "Classes": "m-1",
            //     "type": "Button",
            //     "buttonType": "Submit",
            //     "GridsName": GridType,
            //     "minWidth": 200,
            //     "margin": 3,
            //     "size": "large"
            // },
        ]
    },],
};



export { ParentFields, ParentSchema, ParentOnSubmit, ParentDefaultValue }