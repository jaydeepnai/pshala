import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  MobileToggle,
  changeSidebar,
  sidebarToggle,
} from "../../features/User/UserSlice";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";

function SidebarNav() {
  const { collapseSidebar } = useProSidebar();
  const SidebarToogle = useSelector(sidebarToggle);
  const IsMobile = useSelector(MobileToggle);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [parentMenu, setParentMenu] = useState([
    { Name: "Dashboard", path: "/dashboard", icon: <HomeOutlinedIcon /> },
    {
      Name: "Pathshala Schedule",
      path: "/schedule",
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      Name: "Student Progress",
      path: "/studentProgress",
      icon: <AssessmentOutlinedIcon />,
    },

    {
      Name: "Payment History",
      path: "/paymenthistory",
      icon: <PaymentOutlinedIcon />,
    },
    { Name: "Profile", path: "/profile", icon: <AccountCircleOutlinedIcon /> },
    {
      Name: "Change Password",
      path: "/changePassword",
      icon: <KeyOutlinedIcon />,
    },
  ]);



  const [adminMenu, setAdminMenu] = useState([
    { Name: "Dashboard", path: "/dashboard", icon: <HomeOutlinedIcon /> },
    {
      Name: "Schedule Management",
      path: "/schedule",
      icon: <CalendarMonthOutlinedIcon />,
    },
    {
      Name: "Payment Management",
      path: "/PaymentList",
      icon: <PaymentOutlinedIcon />,
    },
    {
      Name: "Registration",
      path: "/StudentRegisteration",
      icon: <HowToRegOutlinedIcon />,
    },
    {
      Name: "Registered Student",
      path: "/StudentList",
      icon: <HowToRegOutlinedIcon />,
    },
    {
      Name: "Role Management",
      path: "/roles",
      icon: <ManageAccountsOutlinedIcon />,
    },
    {
      Name: "User Management",
      path: "/userList",
      icon: <PeopleOutlinedIcon />,
    },
    {
      Name: "Update Profile",
      path: "/profile",
      icon: <AccountCircleOutlinedIcon />,
    },
    {
      Name: "Change Password",
      path: "/changePassword",
      icon: <KeyOutlinedIcon />,
    },
  ]);

  const [originalMenu, setOriginalMenu] = useState([]);

  const DeviceDetermination = () => {
    if (IsMobile) {
      dispatch(changeSidebar);
      collapseSidebar(true);
    } else {
      dispatch(changeSidebar);
      collapseSidebar(false);
    }
  };

  useEffect(() => {
    DeviceDetermination();
  }, [IsMobile]);

  useEffect(() => {
    const LocalUser = JSON.parse(localStorage.getItem("Data"));
    const UserRole = LocalUser?.roleName;
    // debugger
    if (UserRole === "Parent") {
      setOriginalMenu([...parentMenu]);
    } else {
      setOriginalMenu([...adminMenu]);
    }
  }, []);


  const onClickMenu = (path) => {
    navigation(path);
  };

  return (
    <div>
      <Sidebar style={{ height: "100vh", }}>
        <Menu>
          <MenuItem
            onClick={() => {
              collapseSidebar();
              dispatch(changeSidebar());
            }}
            style={{ textAlign: "center" }}
          >
            {(IsMobile && !SidebarToogle) || (!IsMobile && SidebarToogle) ? (
              <h3>PS</h3>
            ) : (
              <h4 className="mt-2">PathShala</h4>
            )}
          </MenuItem>
          {originalMenu?.map((User) => (
            <MenuItem
              icon={User.icon}
              onClick={() => {
                IsMobile && collapseSidebar(true)
                onClickMenu(User.path);
              }}
            >
              {User.Name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default SidebarNav;
