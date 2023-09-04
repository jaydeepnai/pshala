import * as Yup from "yup";


const DefaultValue = {
    FullName: "",
    Email: "",
    State: "",
    City: "",
    Form: false,
    Submitting: false
}

const OnSubmit = async (values) => {
    // var email = "jaydeep@gmail.com"
    // if (values.Form) {
    //     toast.warning('Please rettype password')
    // }
    // store.dispatch(changeProgress(0))
    // if (email === values.EmailID) {
    //     "first")
    //     toast.warning('The email address you provided may already be associated with an active account.')
    // }
    // store.dispatch(changeProgress(40))
    // var parameters = values
    // var result = await Post({ parameters: parameters, ApiEndPoint: SignUP })
    // debugger;
    // if (result?.isSuccess) {
    //     // history("/Employee");
    //     store.dispatch(changeProgress(100))
    // }
    // else {
    //     store.dispatch(changeProgress(100))
    // }

}


const LoginSchema = Yup.object().shape({
    PaymentDate: Yup.date().required("FirstName should not be empty"),
    Total: Yup.number().required(),
    Dues: Yup.number().required(),
    PaymentType: Yup.string().required("Please select One of them").test((value, ctx) => { if (value == "") { return false; } return true; }),
    Recieved: Yup.number().required("Plase Enter recived Amount"),
    Description: Yup.string().required(""),
});

var GridType = "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12";
var TextWidth = 220

const Fields = {
    blocks: [{
        fld: [
            {
                "name": "PaymentDate",
                "type": "Date",
                "id": "PaymentDate",
                "helperText": "Payment Date",
                "GridName": GridType,
                "Classes": "m-1"
            },
            {
                "name": "Total",
                "type": "number",
                "id": "Total",
                "placeHolder": "Total Amount",
                "helperText": "Your Total Amount",
                "GridName": GridType,
                "Classes": "m-1",
                "width": TextWidth
            },
            {
                "name": "Dues",
                "type": "number",
                "id": "Dues",
                "placeHolder": "Dues Amount",
                "helperText": "Your Dues Amount",
                "GridName": GridType,
                "Classes": "m-1",
                "width": TextWidth
            },
            {
                "name": "PaymentType",
                "type": "DDL",
                "id": "PaymentType",
                "placeHolder": "Payment Type",
                "Classes": "m-1",
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
                "helperText": "About Payment Method",
                "GridName": GridType
            },
            {
                "name": "Recieved",
                "type": "number",
                "id": "Recieved",
                "placeHolder": "Dues Recieved",
                "helperText": "Your Recieved",
                "GridName": GridType,
                "Classes": "m-1",
                "width": TextWidth
            },
            {
                "name": "Description",
                "type": "text",
                "id": "Description",
                "placeHolder": "Description",
                "helperText": "Payment Description",
                "GridName": GridType,
                "Classes": "m-1"
            },
        ]
    },
    {
        // fld: [{
        //     "name": "Student",
        //     "type": "AutoComplete",
        //     "id": "Student",
        //     "placeHolder": "New Student",
        //     "helperText": "Please add a Student",
        //     "GridName": GridType,
        //     "Classes": "m-1",
        //     "data": top100Films,
        //     "width": TextWidth
        // }]
    }
    ],
    // ActionButton: [{
    //     btn: [{
    //         "name": "Sign Up",
    //         "id": "SignUp",
    //         "helperText": "To sign up in PathShala",
    //         "GridName": GridType,
    //         "Classes": "m-1",
    //         "type": "Button",
    //         "buttonType": "Submit",
    //         "GridsName": GridType,
    //         "minWidth": 200,
    //         "margin": 3,
    //         "size": "large"
    //     }
    //     ]
    // },],
};

export { DefaultValue, OnSubmit, LoginSchema, Fields }