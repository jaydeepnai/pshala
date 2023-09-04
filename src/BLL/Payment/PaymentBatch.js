import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PaymentBatch from "../../Components/Payment/PaymentBatch";
import { useLocation, useNavigate } from "react-router-dom";
import { Add_Payment_Allocation, Get_Payment_Allocation } from "../../Data Repository/APIContstant";
import { store } from "../../App/store";
import { changeProgress } from "../../features/User/UserSlice";
import Get from "../../Data Repository/Get";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { List, PaymentMethodsDet, StatesDet } from "../../features/DDL/ListSlice";
import Post from "../../Data Repository/Post";

function PaymentBLL() {
  var GridType = "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12";
  var TextWidth = 220;
  const navigate = useNavigate()

  const [ParentData, setParentData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [IsPaid, setIsPaid] = useState([]);
  const location = useLocation();
  const MemberID = location.state.memberId;

  const columns = [
    {
      accessorKey: "fullname",
      header: "Full Name",
      size: 60,
      Cell: ({ row }) => (
        <div className="MobileTitle" data-th="FullName : ">
          {row.original.fullname}
        </div>
      ),
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
      size: 30,
      Cell: ({ row }) => (
        <div className="MobileTitle" data-th="Mobile : ">
          {row.original.mobile}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 30,
      Cell: ({ row }) => (
        <div className="MobileTitle" data-th="Email : ">
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "jcnjMembershipID",
      header: "JCNJMembershipID",
      size: 20,
      Cell: ({ row }) => (
        <div
          className="MobileTitle"
          data-th="JCNJMembershipID: "
          style={{ paddingBottom: 0 }}
        >
          {row.original.jcnjMembershipID}
        </div>
      ),
    },
    {
      accessorKey: "receivableAmount",
      header: "Receivable Amount",
      size: 20,
      Cell: ({ row }) => (
        <div
          className="MobileTitle"
          data-th="Outstanding Amount: "
          style={{ paddingBottom: 0 }}
        >
          {row.original.receivableAmount}
        </div>
      ),
    },
    {
      accessorKey: "receivedAmount",
      header: "Received Amount",
      size: 20,
      Cell: ({ row }) => (
        <div
          className="MobileTitle"
          data-th="Outstanding Amount: "
          style={{ paddingBottom: 0 }}
        >
          {row.original.receivedAmount}
        </div>
      ),
    },
    {
      accessorKey: "outstandingAmount",
      header: "Outstanding Amount",
      size: 20,
      Cell: ({ row }) => (
        <div
          className="MobileTitle"
          data-th="Outstanding Amount: "
          style={{ paddingBottom: 0 }}
        >
          {row.original.outstandingAmount}
        </div>
      ),
    },

  ];

  const [PaymentValue, setPaymentValue] = useState({
    paymentDate: "2023-08-31",
    Total: "",
    Dues: "",
    paymentTypeID: "",
    receivedAmount: "",
    amountDescription: "",
    Form: false,
  });

  const LoginSchema = Yup.object().shape({
    paymentDate: Yup.date().required("Payment Date should not be empty"),
    paymentTypeID: Yup.string()
      .required("Please select One of them")
      .test((value, ctx) => {
        // console.log(value)
        if (value == 0) {
          return false;
        }
        return true;
      }),
    receivedAmount: Yup.number().required("Please enter a number"),
    amountDescription: Yup.string(),
  });

  const OnSubmit = async (values) => {
    debugger
    var StudentAllocationList = tableData?.map((row) => {
      return {
        adjustedAmount: row.adjustedAmount,
        studentRegistrationID: row.studentRegistrationID
      }
    })
    // console.log(StudentAllocationList)
    var paymentData = {
      "paymentMasterRequest": {
        "paymentDate": formik.values.paymentDate,
        "paymentTypeID": formik.values.paymentTypeID,
        "receivedAmount": formik.values.receivedAmount,
        "amountDescription": formik.values.amountDescription,
        "memberID": MemberID
      },
      "paymentDetailRequest": StudentAllocationList
    }

    var result = await Post({ parameters: paymentData, ApiEndPoint: Add_Payment_Allocation })
    if (result?.status == 200) {
      toast.success(
        result?.data.message
      )
      navigate("/paymentlist")
    }
    else {
      toast.error(
        result?.data
      )
    }

  };


  const formik = useFormik({
    initialValues: PaymentValue,
    onSubmit: OnSubmit,
    validationSchema: LoginSchema,
  });

  const PaymentMethods = useSelector(PaymentMethodsDet)

  const [Fields, setFields] = useState({})

  function formatDateToYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const GetPaymentAllocation = async () => {
    store.dispatch(changeProgress(0));
    try {
      var result = await Get({ parameters: [{ memberID: MemberID }], ApiEndPoint: Get_Payment_Allocation });
      store.dispatch(changeProgress(40));
      debugger
      if (result != undefined && result?.status === 200) {
        setParentData([result?.data.parentDataRequest]);
        var convertedDate;
        if (result?.data.paymentDataRequest !== null) {
          if (result?.data.paymentDataRequest?.paymentDate) {
            const [month, day, year] = result?.data.paymentDataRequest?.paymentDate.split('/').map(part => parseInt(part, 10));
            convertedDate = `${year}-${month?.toString().padStart(2, '0')}-${day?.toString().padStart(2, '0')}`;
          }
          const currentDate = new Date();
          const formattedDate = formatDateToYYMMDD(currentDate);
          // console.log()
          var PaymentDetails = result?.data?.paymentDataRequest
          PaymentDetails.paymentDate = convertedDate === undefined ? formattedDate : convertedDate
          formik.setValues(PaymentDetails);
        }
        else {
          setIsPaid(false)
        }
        if (result?.data.studentDetailRequest !== null) {
          var Student = result?.data.studentDetailRequest
          var Std = Student?.map((s) => {
            return ({ ...s, adjustedAmount: s.adjustedAmount == null ? 0 : parseFloat(s.adjustedAmount) })
          })
          setTableData(Std);
        }
      }
    } catch (error) {

    }
    store.dispatch(changeProgress(100));
  }

  useEffect(() => {
    GetPaymentAllocation()
  }, [])


  useEffect(() => {
    setFields({
      blocks: [
        {
          fld: [
            {
              name: "paymentDate",
              type: "Date",
              id: "PaymentDate",
              helperText: "Payment Date",
              GridName: GridType,
              Classes: "m-1",
            },
            {
              "label": "Relationship With Student*",
              "name": "paymentTypeID",
              "type": "DDL",
              "id": "Relation",
              "placeHolder": "Relation",
              "helperText": "Your Relation",
              "GridName": GridType,
              "Classes": "m-1",
              "width": TextWidth,
              "elm": PaymentMethods,
            },
            {
              name: "receivedAmount",
              label: "Received Amount",
              type: "number",
              id: "Recieved",
              placeHolder: "Dues Recieved",
              helperText: "Your Recieved Amount",
              GridName: GridType,
              Classes: "m-1",
              width: TextWidth,
            },
            {
              name: "amountDescription",
              label: "Amount Description",
              type: "text",
              id: "Amount Description",
              placeHolder: "Description",
              helperText: "Payment Description",
              GridName: GridType,
              Classes: "m-1",
            },
          ],
        },
      ],
      ActionButton: [
        {
          btn: [{}],
        },
      ],
    })
    // }
  }, [])


  // console.log(tableData)
  // console.log(formik.values)


  return (
    <>
      <PaymentBatch
        columns={columns}
        ParentData={ParentData}
        formik={formik}
        Fields={Fields}
        OnSubmit={OnSubmit}
        tableData={tableData}
        setTableData={setTableData}
        IsPaid={IsPaid}
        outstandingAmount={ParentData[0]?.outstandingAmount}
      />
    </>
  );
}

export default PaymentBLL;
