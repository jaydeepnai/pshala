import { MaterialReactTable } from "material-react-table";
import React, { useEffect, useState } from "react";
import { PAYMENTHISTORY } from "../../Data Repository/APIContstant";
import Get from "../../Data Repository/Get";
import { toast } from "react-toastify";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import { Avatar, Button, Chip, CircularProgress } from "@mui/material";

function PaymentHistory() {
  const [pHistory, setPHistory] = useState("");

  const Columns = [
    {
      accessorKey: "academicYearName",

      size: 100,

      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left" }}
            className="MobileTitle"
            data-th="Academic Year : "
          >
            {row.original.academicYearName}
          </div>
        );
      },
      Header: () => {
        return (
          <div style={{ textAlign: "center", marginLeft: "0px" }}>
            Academic Year
          </div>
        );
      },
    },

    {
      accessorKey: "paymentDate",
      header: " Payment Date",
      size: 100,
      Cell: ({ row }) => {
        const date = row.original.paymentDate;
        const indexOfSpecificCharacter = date?.indexOf("T");
        const formattedDate = date?.substring(0, indexOfSpecificCharacter);

        return (
          <div
            style={{ textAlign: "left" }}
            className="MobileTitle"
            data-th="Payment Date : "
          >
            {formattedDate}
          </div>
        );
      },
    },

    {
      accessorKey: "receivedAmount",
      header: "Received Amount",
      size: 100,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left" }}
            className="MobileTitle"
            data-th="Received Amount : "
          >
            {row.original.receivedAmount}
          </div>
        );
      },
    },
    {
      accessorKey: "note",
      header: "Note",
      size: 100,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left" }}
            className="MobileTitle"
            data-th="Net Receivable Amount : "
          >
            {row.original.note}
          </div>
        );
      },
    },
  ];

  const getPaymenthistory = async () => {
    store.dispatch(changeProgress(20));
    var parameters = [
      {
        userId: LuserId,
      },
    ];

    var result = await Get({
      parameters: parameters,
      ApiEndPoint: PAYMENTHISTORY,
    });

    store.dispatch(changeProgress(50));
    if (result != undefined && result?.status === 200) {
      setPHistory(result?.data);
      // toast.success(result?.data, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else {
      // setPHistory([]);
      // toast.error("No data found", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }

    store.dispatch(changeProgress(100));
  };

  useEffect(() => {
    getPaymenthistory();
  }, []);

  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  let LuserId = LocalUser?.userId;
  let fullName = pHistory[0]?.fullName;
  let firstChar = fullName ? fullName.charAt(0) : "";

  return (
    <>
      <div
        style={{ marginLeft: "15px", marginRight: "15px", marginTop: "20px" }}
      >
        <b> Payment History </b>
      </div>

      <div
        style={{ marginLeft: "15px", marginRight: "15px", marginTop: "15px" }}
      >
        <MaterialReactTable
          columns={Columns}
          data={pHistory}
          enablePagination={false}
          enableSorting={false}
          enableColumnFilterModes={false}
          columnFilterModeOptions={false}
          enableColumnActions={false}
          renderTopToolbarCustomActions={() => (
            <Button
              variant="contained"
              disabled={true}
              style={{ backgroundColor: "#7ae2e7", color: "black" }}
            >
              {" "}
              Parent Name :
              <Chip
                avatar={
                  <Avatar
                    style={{ color: "#f50057", backgroundColor: "#82b1ff" }}
                  >
                    {firstChar}
                  </Avatar>
                }
                label={fullName}
                style={{
                  color: "#101de5",
                  backgroundColor: "whitesmoke",
                  marginLeft: "5px",
                }}
              />
            </Button>
          )}
        />
      </div>
    </>
  );
}

export default PaymentHistory;
