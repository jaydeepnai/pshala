//#region imports
import { useLocation, useRoutes, } from 'react-router-dom';
import './App.css';
import './MediaQuery.css';
import './CustomClasses.css';
import { useEffect } from 'react';
import './App.css';
import './MediaQuery.css';
import './CustomClasses.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { changeDevice, ProgressBar, changeProgress } from './features/User/UserSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { GetDDL } from './Data Repository/APIContstant';
import { AddAddressTypes, AddGenderList, AddPaymentMethods, AddRelations, AddSchoolGrades, AddStates, List } from './features/DDL/ListSlice';
import DropDown from './Data Repository/DropDownList';
import AuthProvider from "./BLL/Commen/AuthProvider";
import Header from "./Components/Master/Header";
import SidebarNav from "./Components/Master/Sidebar"
import { AdminRoutes, DashboardRoutes, UnMatchedRoutes } from "./Routes/DashboardRoutes";
import LoginRoutes from "./Routes/LoginRoutes";
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

//#endregion

function App() {
    const LocalUser = JSON.parse(localStorage.getItem("Data"));
    const [data, setData] = useLocalStorageState('Data', {});
    const Role = LocalUser?.roleName;
    const [routes, setRoutes] = useState([
        ...LoginRoutes,
        {
            element: (
                <>
                    <AuthProvider>
                        <SidebarNav />
                        <div className="Sidebar-Width PScontent">
                            <Header />
                            <div className='full-width-containerCus'>
                                <Outlet />
                            </div>
                        </div>
                    </AuthProvider>
                </>
            ),
            children: Role != "Pathshala Admin" && Role != "System Admin" ? [...DashboardRoutes] : [...AdminRoutes]
        },
        ...UnMatchedRoutes
    ]
    )
    const progress = useSelector(ProgressBar);
    const ListDet = useSelector(List);
    const dispatch = useDispatch();
    const content = useRoutes(routes);
    const handleWindowResize = () => {
        const width = window.innerWidth;
        dispatch(changeDevice(width <= 830));
    };

    const GetAllDDL = async () => {
        var Relations = await DropDown({ ApiEndPoint: GetDDL, type: "RELATIONSHIP" })
        dispatch(AddRelations(Relations?.data))
        var States = await DropDown({ ApiEndPoint: GetDDL, type: "STATE " })
        dispatch(AddStates(States?.data))
        var Grades = await DropDown({ ApiEndPoint: GetDDL, type: "SCHOOLGRADE" })
        dispatch(AddSchoolGrades(Grades?.data))
        var Genders = await DropDown({ ApiEndPoint: GetDDL, type: "GENDER" })
        dispatch(AddGenderList(Genders?.data))
        var PaymentTypes = await DropDown({ ApiEndPoint: GetDDL, type: "PAYMENTTYPE" })
        dispatch(AddPaymentMethods(PaymentTypes?.data))
        var Adresses = await DropDown({ ApiEndPoint: GetDDL, type: "ADDRESSTYPE" })
        dispatch(AddAddressTypes(Adresses))
        // var UserRoles = await Get({ ApiEndPoint: GetDDL, type: "GENDER" })
        // dispatch(AddUserRoles(UserRoles?.data))
    };


    window.addEventListener('resize', handleWindowResize);
    useEffect(() => {
        handleWindowResize()
    }, [])


    const location = useLocation();

    useEffect(() => {
        if (
            // ListDet.UserRoles.length == 0 ||
            ListDet.States?.length == 0 ||
            ListDet.SchoolGrades?.length == 0 ||
            ListDet.Relations?.length == 0 ||
            ListDet.PaymentMethods?.length == 0 ||
            ListDet.GenderLists?.length == 0 ||
            ListDet.AddressTypes?.leng == 0
        ) {
            GetAllDDL()
        }
    }, [location]);



    useEffect(() => {
        setRoutes([
            ...LoginRoutes,
            {
                element: (
                    <>
                        <AuthProvider>
                            <SidebarNav />
                            <div className="Sidebar-Width PScontent">
                                <Header />
                                <div className='full-width-containerCus'>
                                    <Outlet />
                                </div>
                            </div>
                        </AuthProvider>
                    </>
                ),
                children: Role != "Pathshala Admin" && Role != "System Admin" ? [...DashboardRoutes] : [...AdminRoutes]
            },
            ...UnMatchedRoutes
        ])
    }, [data]);

    // console.log(navigate.)

    return <>
        <div id="app" style={({ height: "100vh", display: "flex", })}>
            {content}
            <main>
                <LoadingBar
                    className='LoadingBar'
                    color='#f11946'
                    height={3}
                    progress={progress}
                    onLoaderFinished={() => dispatch(changeProgress(0))}
                />
                <ToastContainer style={{
                    width: '350px',
                    margin: '20px'
                }}
                    autoClose={25000}
                />
            </main>
        </div>
    </>
}

export default App;
