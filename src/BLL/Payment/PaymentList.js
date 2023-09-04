import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import InfoIcon from "@mui/icons-material/Info";
import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import PaymentModel from "../../Components/Payment/PaymentModel";
import { MEMBERWISEPAYMENTLIST } from "../../Data Repository/APIContstant";
import { toast } from "react-toastify";
import Get from "../../Data Repository/Get";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import { useNavigate } from "react-router-dom";
import PaymentHistory from "../../Components/Payment/PaymentHistory";

function PaymentList() {
  const [open, setOpen] = React.useState(false);
  const [openPH, setOpenPH] = React.useState(false);
  const [paymentHistoryID, setPaymentHistoryID] = useState();
  const [Info, setInfo] = React.useState({});
  const [data, setData] = useState([]);
  const [currentY, setCurrentY] = useState();
  const navigate = useNavigate();
  const handleClickOpen = (InfoID) => {
    setOpen(true);
    const foundObject = data.find((item) => item.id === InfoID);
    setInfo(foundObject);
  };

  const handleClose = () => {
    setOpen(false);
    setInfo("");
  };

  const Columns = [
    {
      accessorKey: "fullName",
      header: "Full Name",
      style: {
        textAlign: "left",
        marginLeft: "0px",
      },
      size: 50,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="FullName : "
          >
            {row.original.fullName}
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      style: {
        textAlign: "left",
        marginLeft: "0px",
      },
      size: 50,
      Cell: ({ row }) => {
        {
          var str = row.original.email;
          var strmail = str.slice(0, 10);
        }
        return (
          <>
            <div
              style={{ textAlign: "left" }}
              className="MobileTitle"
              data-th="Email : "
            >
              {strmail}...
            </div>
          </>
        );
      },
    },

    {
      accessorKey: "jcnjid",
      header: "Jcnj Id",
      style: {
        textAlign: "left",
        marginLeft: "0px",
      },
      size: 50,

      Cell: ({ row }) => {
        {
          var jcnj = row.original.jcnjid;
          var jcnjtext = jcnj.slice(0, 6);
        }
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="JCNJ ID : "
          >
            {jcnjtext}...
          </div>
        );
      },
    },
    {
      accessorKey: "paymentType",
      header: "Pay Type",
      style: {
        textAlign: "left",
        marginLeft: "0px",
      },
      size: 50,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "left", marginRight: "0px" }}
            className="MobileTitle"
            data-th="Payment Type : "
          >
            {row.original.paymentType}
          </div>
        );
      },
    },

    {
      accessorKey: "receivableAmount",
      header: "Receivable",
      size: 50,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "right" }}
            className="MobileTitle"
            data-th="Recievable Amount : "
          >
            {row.original.receivableAmount}
          </div>
        );
      },
    },

    {
      accessorKey: "receivedAmount",
      header: "Received",

      size: 50,
      Cell: ({ row }) => {
        return (
          <div
            className="MobileTitle tbr"
            style={{ textAlign: "right" }}
            data-th="Recieved Amount : "
          >
            {row.original.receivedAmount}
          </div>
        );
      },
    },
    {
      accessorKey: "netReceivableAmount",
      header: "Net Receivable",

      size: 50,
      Cell: ({ row }) => {
        return (
          <div
            style={{ textAlign: "right" }}
            className="MobileTitle"
            data-th="Net Recievable Amount : "
          >
            {row.original.netReceivableAmount}
          </div>
        );
      },
    },
    {
      accessorKey: "isPaid",
      header: "Is Paid",
      style: {
        textAlign: "left",
        marginLeft: "0px",
      },
      size: 50,
      Cell: ({ row }) => {
        return (
          <div className="MobileTitle" data-th="Is Paid : ">
            <Chip
              label={row.original.isPaid}
              color={
                row.original.isPaid == "Yes"
                  ? "success"
                  : row.original.isPaid == "No"
                  ? "error"
                  : "primary"
              }
            />
          </div>
        );
      },
    },
    {
      accessorKey: "ProgressLink",
      header: "Student Related Links",
      size: 200,
      fil: false,
      Cell: ({ row }) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {(row.original.isPaid === "No" ||
              row.original.isPaid === "Partial") && (
              <div>
                <Button
                  style={{ color: "#ff3d00", fontWeight: "bold" }}
                  onClick={() =>
                    navigate("/PaymentBatch", {
                      state: { memberId: row.original.memberId },
                    })
                  }
                >
                  Apply Payment
                </Button>
              </div>
            )}
            <div>
              <Button
                style={{ color: "#d500f9 ", fontWeight: "bold" }}
                onClick={() =>
                  handleClickOpenPaymentHistory(row.original.userId)
                }
              >
                Payment History
              </Button>
            </div>
          </div>
        );
      },
    },
    // {
    //   accessorKey: "Action",

    //   enableColumnActions:false,
    //   Cell: ({ row }) => {
    //     return (
    //       <div>
    //         <IconButton
    //           disabled={row.original.PaymentRecieved == "no"}
    //           onClick={() =>
    //             navigate("/PaymentBatch", {
    //               state: { memberId: row.original.memberId },
    //             })
    //           }
    //         >
    //           <InfoIcon
    //             style={{
    //               color:
    //                 row.original.PaymentRecieved == "yes"
    //                   ? "#1976d2"
    //                   : "#a7ccf1",
    //               fontSize: 30,
    //             }}
    //           />
    //         </IconButton>
    //       </div>
    //     );
    //   },
    // },
  ];

  const handleClickOpenPaymentHistory = async (id) => {
    setOpenPH(true);
    store.dispatch(changeProgress(0));
    try {
      var parameters = {
        userId: id,
      };
      setPaymentHistoryID(parameters);
    } catch (error) {
      // toast.error(error.message)
    }
    store.dispatch(changeProgress(100));
  };

  const handleClosePH = () => {
    setOpenPH(false);
  };

  const getMemberwisePList = async () => {
    store.dispatch(changeProgress(20));
    var result = await Get({ ApiEndPoint: MEMBERWISEPAYMENTLIST });
    store.dispatch(changeProgress(50));
    if (result != undefined && result?.status === 200) {
      setData(result?.data);
      // toast.success(result?.data, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    } else {
      // setData([]);
      // toast.error(result?.data, {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
    store.dispatch(changeProgress(100));
  };

  const LocalUser = JSON.parse(localStorage.getItem("Data"));
  let LUser = LocalUser?.currentAcademicYearName;

  useEffect(() => {
    getMemberwisePList();
  }, []);

  return (
    <>
      <div className="Page-Header">
        <b style={{ marginLeft: "5px" }}> Payment List </b>{" "}
        <span style={{ marginLeft: "5px", color: "#ff4081" }}>{LUser} </span>
      </div>
      <div className="MUI-Table Table_width PaymentList">
        <MaterialReactTable
          columns={Columns}
          data={data}
          showGlobalFilter={true}
          enableGlobalFilter={true}
          positionGlobalFilter="left"
          initialState={{
            showGlobalFilter: true,
            density: "compact",
          }}
          enableSorting={true}
          enableMultiSort={true}
          sortModel={[]}
          filterable={true}
          sortUndefined={true}
          sortDescFirst
          enableClickToCopy={false}
          muiTableBodyRowProps={(row) => {
            if (row.row.depth == 1) {
              return { style: { backgroundColor: "rgb(191 255 211)" } };
            } else if (row.row.depth == 2) {
              return { style: { backgroundColor: "rgb(215 250 245)" } };
            }
          }}
        />
        <div>
          <Dialog
            open={openPH}
            // TransitionComponent={Transition}
            className="DialogWidth"
            keepMounted
            onClose={handleClosePH}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <DialogContentText id="ParentDetail">
                <Card>
                  <PaymentHistory paymentHistoryID={paymentHistoryID} />
                </Card>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePH}>Go Back</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default PaymentList;
