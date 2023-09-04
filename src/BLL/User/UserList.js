import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Chip } from "@mui/material";
import UserList from "../../Components/User/UserList";
import { useEffect } from "react";
import Get from "../../Data Repository/Get";
import { USERANDROLEDETAILS } from "../../Data Repository/APIContstant";
import RowActionUserList from "../../Components/User/RowActionUserList.js";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import { toast } from "react-toastify";

function UserListBLL() {
  const [rowSelection, setRowSelection] = useState([]);
  const [UserData, setUserData] = useState([]);
  const [isMultipleSelected, setIsMultipleSelected] = useState(false);

  const getAllUser = async () => {
    store.dispatch(changeProgress(0));
    var result = await Get({ ApiEndPoint: USERANDROLEDETAILS });
    store.dispatch(changeProgress(40));
    if (result != undefined && result?.status === 200) {
      setUserData([...result?.data]);
      // toast.success("All Users Details", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }

    store.dispatch(changeProgress(100));
  };

  const columns = [
    {
      accessorKey: "userName",
      // header: "userName/email",
      Cell: ({ row }) => {
        return <div className="MobileTitle" data-th="User Name : ">{row.original.userDetail.userName}</div>;
      },
      Header: ({ row }) => (
        <div style={{ marginLeft: "15px" }}>
          User Name
        </div>
      )
    },
    {
      accessorKey: "roleName",
      header: "roles",

      Cell: ({ row }) => {
        const roleNames = row.original.roles?.map((role) => role.name);
        return (
          <div className="MobileTitle" data-th="Role : ">
            {roleNames?.map((roleName, index) => (
              <Chip
                key={index}
                label={roleName}
                color="success"
                style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}
              />
            ))}
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: " ",
      Cell: ({ row }) => {
        return (
          <>
            <RowActionUserList
              row={row}
              UserData={UserData}
              setUserData={setUserData}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <UserList />
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <MaterialReactTable

          columns={columns}
          data={UserData}
          enableStickyHeader
          positionGlobalFilter="left"
          initialState={{ density: "compact" }}
          enableGlobalFilter={true}
          enableColumnFilter={true}
          paginateExpandedRows={true}
          editingMode="modal"
          enableColumnOrdering
          positionActionsColumn="last"
        />
      </div>
    </>
  );
}

export default UserListBLL;
