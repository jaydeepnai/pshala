import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useProSidebar } from "react-pro-sidebar";
import { MobileToggle, changeSidebar } from "../../features/User/UserSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Post from "../../Data Repository/Post";
import { LOGOUT } from "../../Data Repository/APIContstant";
import { toast } from "react-toastify";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import Cookies from "js-cookie";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(1),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const { collapseSidebar } = useProSidebar();
  const IsMobile = useSelector(MobileToggle);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const Logout = async () => {
    try {
      var result = await Post({ ApiEndPoint: LOGOUT });

      if (result != undefined && result?.status === 200) {
        // toast.success("You are successfully logged out ", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
        localStorage.removeItem("Data");
        // Cookies.remove('Data');
        navigation("/login");
      }
    } catch (error) {
      // toast.error(error.response.data, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };

  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  let UserName = LocalUser?.userName;
  const indexOfSpecificCharacter = UserName?.indexOf("@");
  UserName = UserName?.substring(0, indexOfSpecificCharacter);

  return (
    <div className="Header">
      <Box>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => {
                collapseSidebar();
                dispatch(changeSidebar());
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* {!IsMobile && (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            )} */}
            <div className="LoginActionBtn">
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <b style={{ color: "#fff", marginRight: "5px" }}>{UserName}</b>

                <Button
                  endIcon={<PowerSettingsNewOutlinedIcon />}
                  sx={{ color: "#fff" }}
                  onClick={Logout}
                >
                  {" "}
                  Logout
                </Button>
              </Box>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
