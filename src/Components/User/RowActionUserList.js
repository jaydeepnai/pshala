import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Delete as MUIDelete, Lock, LockOpen } from "@mui/icons-material";
import React, { useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  DeleteUserByUserId,
  RESETPASSWORD,
  USERLOCKUNLOCK,
} from "../../Data Repository/APIContstant";
import Delete from "../../Data Repository/Delete";
import Patch from "../../Data Repository/Edit";
import { toast } from "react-toastify";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import { useEffect } from "react";

function RowActionUserList({ row, UserData, setUserData }) {
  const [open, setOpen] = React.useState(false);
  const [openL, setOpenL] = React.useState(false);
  const [lock, setLock] = React.useState();
  const [openR, setOpenR] = React.useState(false);
  const [lockUserID, setLockUserID] = React.useState();
  const [userResetID, setUserResetID] = React.useState();
  const [deleteID, setDeleteID] = useState("");
  const [lockoutEnabled, setLockoutEnabled] = React.useState(
    !row.original.userDetail.lockoutEnabled
  );
  const [iconColor, seticonColor] = React.useState();

  useEffect(() => {
    seticonColor(lockoutEnabled ? "red" : "green");
  }, [lockoutEnabled]);

  const DeleteRow = async (row) => {
    setOpen(true);

    setDeleteID(row.original.userDetail.id);
  };

  const handleLockRow = async (row) => {
    setOpenL(true);
    store.dispatch(changeProgress(20));

    setLock(lockoutEnabled);
    setLockUserID(row.original.userDetail.id);
  };

  const handleReset = async (row) => {
    setOpenR(true);
    setUserResetID(row.original.userId);
  };

  const handleOpenReset = async () => {
    setOpenR(false);
    store.dispatch(changeProgress(20));

    var parameters = {
      userId: userResetID,
    };
    store.dispatch(changeProgress(60));

    var result = await Patch({
      parameters: parameters,
      ApiEndPoint: RESETPASSWORD,
    });

    store.dispatch(changeProgress(100));
    if (result != undefined && result?.status === 200) {
      toast.success(result?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    store.dispatch(changeProgress(100));
  };

  const handleOpenLockUnlock = async () => {
    setOpenL(false);
    store.dispatch(changeProgress(20));
    var parameters = {
      userId: lockUserID,
      isLocked: lock,
    };

    store.dispatch(changeProgress(60));
    var result = await Patch({
      parameters: parameters,
      ApiEndPoint: USERLOCKUNLOCK,
    });

    store.dispatch(changeProgress(100));
    setLockoutEnabled(!lockoutEnabled);
    if (result != undefined && result?.status === 200) {
      toast.success(
        lockoutEnabled ? "User UnLocked Successful" : "User Locked Successful",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseLock = () => {
    setOpenL(false);
  };
  const handleCloseReset = () => {
    setOpenR(false);
  };

  const handleOpenDelete = async () => {
    setOpen(false);

    store.dispatch(changeProgress(20));

    var parameters = [{ userId: deleteID }];
    store.dispatch(changeProgress(60));

    var result = await Delete({
      parameters: parameters,
      ApiEndPoint: DeleteUserByUserId,
    });

    if (result != undefined && result?.status === 200) {
      toast.success(result?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
      let index = UserData.findIndex((item) => item.userId === deleteID);
      if (index >= 0) {
        UserData.splice(index, 1);
        setUserData([...UserData]);
      }
    } else {
      toast.error(result?.data, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    store.dispatch(changeProgress(100));
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip arrow placement="right" title="Delete">
          <IconButton onClick={() => DeleteRow(row)}>
            <MUIDelete style={{ color: "red" }} />
          </IconButton>
        </Tooltip>
        <Tooltip
          arrow
          placement="right"
          title={lockoutEnabled ? "Lock" : "Unlock"}
        >
          <IconButton
            style={{ color: iconColor }}
            onClick={() => handleLockRow(row)}
          >
            {lockoutEnabled ? <Lock /> : <LockOpen />}
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="right" title="Reset Password">
          <IconButton
            color="primary"
            disabled={lockoutEnabled}
            onClick={() => handleReset(row)}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <h4 style={{ marginTop: "5px", marginLeft: "20px" }}>
            Deleting user
          </h4>

          <DialogContent>
            <div style={{ marginTop: "-25px", fontSize: "20px" }}>
              {" "}
              Are you sure to delete a user
            </div>
            <DialogContentText
              id="alert-dialog-description"
              style={{ marginTop: "-5px" }}
            >
              If you delete a user and later decide you want to restore them,
              you can do so by contacting the pathshala admin.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOpenDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openL}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {lock === false
              ? "Do you want to lock a user"
              : "Do you want to unlock a user"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {lock === false
                ? "If a user is locked, they are unable to access Pathshala."
                : "If a user is unlocked, they are able to access Pathshala."}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseLock}>Cancel</Button>
            <Button onClick={handleOpenLockUnlock} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={openR}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do you want to reset a user's password?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If the user's password is reset, a new password will be sent to
              their registered email address.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReset}>Cancel</Button>
            <Button onClick={handleOpenReset} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default RowActionUserList;
