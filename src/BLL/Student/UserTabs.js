import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import UserTab from './UserTab';
import { toast } from 'react-toastify';



function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function UserTabs({ Users, setUsers, TabType, ValidateStudent, setValidateStudent }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    if (Users.length == 1) {
      setValue(0)
    }
  }, [Users])


  const AddTab = () => {
    if (Users.length <= 3) {

      setUsers([...Users,
      TabType == 'Gaurdian' ? {
        id: Users.length,
        UserType: TabType,
        firstName: "",
        middleName: "",
        lastName: "",
        relationID: "",
        email: "",
        cellPhone: "",
      } :
        {
          id: Users.length,
          UserType: TabType,
          firstName: '',
          lastName: '',
          middleName: '',
          genderID: 3,
          gradeID: 0,
          classID: 0,
          email: '',
          cellPhone: "",
        }
      ])
    }
    else {
      toast.warning("More then 4 tabs are not allowed")
    }
  }

  const DeleteItem = (id, value) => {
    if (Users.length != 1 || TabType == "Gaurdian") {

      const updatedData = Users.filter((obj) => obj.id !== id);
      setUsers(updatedData);
      setValue(value == 0 ? 0 : value - 1)
    }
    else {
      toast.warning("You should have at least one Tab")
    }
  }

  // console.log(Users)

  return (
    <Box sx={{ bgcolor: 'background.paper', width: "-webkit-fill-available" }} className="muiCusTabs">
      <div className='d-flex justify-content-between'>
        <AppBar position="static" className='Tabination'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {
              Users?.map((item, i) => {
                return (
                  <Tab
                    label={
                      <div className='d-flex justify-content-between align-items-center' style={{ width: "-webkit-fill-available" }}>
                        <div>
                          {item.firstName == "" || item.firstName == undefined ? item.UserType : item.firstName}
                        </div>
                        {value == i && <IconButton size="small" onClick={() => {
                          DeleteItem(item.id, value)
                        }}
                        >
                          <CloseIcon />
                        </IconButton>
                        }
                      </div>
                    }
                    {...a11yProps(i)}
                  />
                )
              })
            }
          </Tabs>
        </AppBar>
        <IconButton className='AddTabs' onClick={AddTab}>
          <AddIcon />
        </IconButton>
      </div>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        className='Swipable'
        onChangeIndex={handleChangeIndex}
      >
        {
          Users?.map((item, i) =>
            <UserTab item={item} ValidateStudent={ValidateStudent} setValidateStudent={setValidateStudent}
              i={i} setUsers={setUsers} Users={Users} TabType={TabType} />
          )
        }

      </SwipeableViews>
    </Box>
  )
}

export default UserTabs