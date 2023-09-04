import * as Yup from "yup";
import { toast } from "react-toastify";
import Post from "../../../../Data Repository/Post";
import { SignUP } from "../../../../Data Repository/APIContstant";
import { store } from "../../../../App/store";
import { changeProgress } from "../../../../features/User/UserSlice";

const DefaultValue = {
  FirstName: "",
  LastName: "",
  MobileNumber: "",
  Email: "",
  JCNJMemberID: "",
  Password: "",
  Form: false,
  Submitting: false,
};

const OnSubmit = async (values, navigate) => {
  values.isSubmitting = true;
  store.dispatch(changeProgress(0));
  if (values.Form) {
    toast.warning("Please rettype password");
    return;
  }

  store.dispatch(changeProgress(40));

  delete values.Form;
  values["JCNJMemberID"] = String(values["JCNJMemberID"]);

  var parameters = values;
  var result = await Post({ parameters: parameters, ApiEndPoint: SignUP });
  store.dispatch(changeProgress(100));
  if (result?.isSuccess) {
    // navigation("/login");
    window.location.href = "https://jainpathshala.org/";
  }
};

var PhoneRegExp = /^[0-9]{7,}$/;
var Name = /^[A-Za-z]+$/;
var Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
var EmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const LoginSchema = Yup.object().shape({
  FirstName: Yup.string()
    .matches(Name, "Special char, Numbers are not allowed")
    .required("FirstName should not be empty"),
  LastName: Yup.string()
    .matches(Name, "Special char, Numbers are not allowed")
    .required("LastName should not be empty"),
  MobileNumber: Yup.string()
    .min(10, "Need atleast 10 digits")
    .matches(PhoneRegExp, "Phone number is not valid")
    .required("Mobile Number should not be empty"),
  Email: Yup.string()
    .matches(EmailRegex, "Enter valid email Adress")
    .required("Please enter a valid email address."),
  JCNJMemberID: Yup.string().max(20),
  Password: Yup.string()
    .min(8, "Password must be 8 characters at minimum")
    .matches(
      Password,
      "It should have 1 Uppercase,Lowercase,Number & Special Chars "
    )
    .required("Password should not be empty"),
});

var GridType = "col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-12";
var TextWidth = 220;

const Fields = {
  blocks: [
    {
      fld: [
        {
          name: "FirstName",
          type: "text",
          id: "FirstName",
          placeHolder: "First Name",
          helperText: "Your First Name",
          GridName: GridType,
          Classes: "m-1",
          width: TextWidth,
        },
        {
          name: "LastName",
          type: "text",
          id: "LastName",
          placeHolder: "Last Name",
          helperText: "Your Last Name",
          GridName: GridType,
          Classes: "m-1",
          width: TextWidth,
        },
        {
          name: "MobileNumber",
          type: "phone",
          id: "MobileNumber",
          placeHolder: "Mobile Number",
          helperText: "Your Mobile Number",
          GridName: GridType,
          Classes: "m-1",
          width: TextWidth,
        },
        {
          name: "Email",
          type: "email",
          id: "Email",
          placeHolder: "Email ID",
          helperText: "Your Email ID",
          GridName: GridType,
          Classes: "m-1",
          width: TextWidth,
        },
        {
          name: "JCNJMemberID",
          type: "text",
          id: "JCNJMemberID",
          placeHolder: "JCNJ Membership ID",
          helperText: "Your JCNJ Membership ID",
          GridName: GridType,
          Classes: "m-1",
          width: TextWidth,
        },
      ],
    },
    {
      fld: [
        {
          name: "Password",
          type: "password&confirmPassword",
          id: "Passsword",
          placeHolder: "Password",
          show: false,
          helperText: "Your Password",
          GridName: GridType,
          Classes: "m-1",
          width: TextWidth,
        },
      ],
    },
    // {
    //     fld: [{
    //         "name": "Captcha",
    //         "type": "Captcha",
    //         "id": "Captcha",
    //         "placeHolder": "Captcha",
    //         "helperText": "Need to enter as Appear",
    //         "GridName": GridType,
    //         "Classes": "m-1",
    //         "width": TextWidth
    //     }]
    // }
  ],
  ActionButton: [
    {
      btn: [
        {
          name: "Sign Up",
          id: "SignUp",
          helperText: "To sign up in PathShala",
          GridName: GridType,
          Classes: "m-1",
          type: "Button",
          buttonType: "Submit",
          GridsName: GridType,
          minWidth: 200,
          margin: 3,
          size: "large",
        },
        {
          name: "Clear",
          id: "Clear",
          helperText: "Clear the form",
          GridName: GridType,
          Classes: "m-1",
          type: "reset",
          buttonType: "reset",
          GridsName: GridType,
          minWidth: 200,
          margin: 3,
          size: "large",
        },
        {
          name: "Sign-In",
          id: "Login",
          href: "https://jainpathshala.org",
          helperText: "Login into pathshala",
          GridName: GridType,
          Classes: "m-1",
          type: "link",
          buttonType: "link",
          GridsName: GridType,
          minWidth: 200,
          margin: 3,
          size: "large",
        },
      ],
    },
  ],
};

export { DefaultValue, OnSubmit, LoginSchema, Fields };
