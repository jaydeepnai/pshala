import { lazy } from "react";
import Loadable from "../Components/Master/Loadable";


const SignupBLL = Loadable(lazy(() => import("../BLL/User/Form/Sign Up/Signup")));
const StudentRegistration = Loadable(lazy(() => import("../BLL/Student/StudentRegister")));
const StudentRegistrationC = Loadable(lazy(() => import("../BLL/Student/StudentRegister copy")));
const LoginBLL = Loadable(lazy(() => import("../BLL/User/Login")));
const ForgotPasswordBLL = Loadable(lazy(() => import("../BLL/User/ForgotPassword")));
const ChangePasswordBLL = Loadable(lazy(() => import("../BLL/User/ChangePassword")));

const LoginRoutes = [
    { path: '/signup', element: <SignupBLL />, },
    { path: '/login', element: <LoginBLL />, },
    { path: '/', element: <LoginBLL />, },
    // { path: '/StudentRegisteration', element: <StudentRegistration />, },
    { path: '/StudentRegisteration', element: <StudentRegistrationC />, },
    { path: '/forgotpassword', element: <ForgotPasswordBLL />, },

];

export default LoginRoutes;