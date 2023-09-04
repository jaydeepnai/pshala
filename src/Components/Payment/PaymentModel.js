import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import { ParentOnSubmit, ParentFields, ParentSchema } from '../../BLL/Payment/Form/PaymentDetail/PaymentDetailsFormOptions';
import StudentPaymentTable from '../../BLL/Payment/StudentPaymentTable';
import { useEffect } from 'react';
import * as Yup from "yup";
import Form from '../Master/Forms/Form';

function PaymentModel({ open, handleClose, handleAgree, data }) {

    var GridType = "col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12";
    var TextWidth = 220

    const PaymentSchema = Yup.object().shape({
        PaymentDate: Yup.date().required("Payment Date should not be empty"),
        PaymentType: Yup.string().required("Please select One of them").test((value, ctx) => { if (value == "Select") { return false; } return true; }),
        RecievedAmount: Yup.number().required("Please enter a number"),
        AmountDescription: Yup.string(),
    });

    const PaymentOnSubmit = async (values) => {
    }

    const PaymentFields = {
        blocks: [{
            fld: [
                {
                    "name": "PaymentDate",
                    "type": "Date",
                    "id": "PaymentDate",
                    "helperText": "Payment Date",
                    "GridName": GridType,
                    "Classes": "m-1"
                },
                {
                    "name": "PaymentType",
                    "type": "DDL",
                    "id": "PaymentType",
                    "placeHolder": "Payment Type",
                    "Classes": "m-1",
                    "elm": [
                        {
                            "name": "Check",
                            "label": "Check",
                            "value": "Check"
                        },
                        {
                            "name": "Credit Card Payment",
                            "label": "Credit Card Payment",
                            "value": "CreditCardPayment"
                        },
                        {
                            "name": "Zelle",
                            "label": "Zelle",
                            "value": "Zelle"
                        }
                    ],
                    "helperText": "About Payment Method",
                    "GridName": GridType
                },
                {
                    "name": "RecievedAmount",
                    "type": "number",
                    "id": "Recieved",
                    "placeHolder": "Dues Recieved",
                    "helperText": "Your Recieved Amount",
                    "GridName": GridType,
                    "Classes": "m-1",
                    "width": TextWidth
                },
                {
                    "name": "AmountDescription",
                    "type": "text",
                    "id": "Amount Description",
                    "placeHolder": "Description",
                    "helperText": "Payment Description",
                    "GridName": GridType,
                    "Classes": "m-1"
                },
            ]

        },
        ],
        ActionButton: [{
            btn: [
                //     {
                //     "name": "Save",
                //     "id": "Save",
                //     "helperText": "To Save Payment details PathShala",
                //     "GridName": GridType,
                //     "Classes": "m-1",
                //     "type": "Button",
                //     "buttonType": "Submit",
                //     "GridsName": GridType,
                //     "minWidth": 260,
                //     "margin": 3,
                //     "size": "large"
                // }
            ]
        },],
    };

    const PaymentFormik = useFormik({
        initialValues: {
            PaymentDate: "",
            Total: "",
            Dues: "",
            PaymentType: "",
            RecievedAmount: "",
            AmountDescription: "",
            Form: false,
        },
        onSubmit: PaymentOnSubmit,
        validationSchema: PaymentSchema
    });
    
    const ParentFormik = useFormik({
        initialValues: {
            FullName: "",
            Email: "",
            State: "",
            City: "",
            Form: false,
            Submitting: false,
        },
        onSubmit: ParentOnSubmit,
        validationSchema: ParentSchema
    });


    useEffect(() => {
        ParentFormik.resetForm({
            values: {
                FullName: data?.FullName || "",
                Email: data?.email || "",
                State: data?.state || "",
                City: data?.city || "",
                Form: false,
                Submitting: false,
            },
        });
        PaymentFormik.resetForm(
            {
                values: {
                    PaymentDate: data?.Payment?.PaymentDate,
                    Total: data?.Payment?.Total,
                    Dues: "",
                    PaymentType: data?.Payment?.PaymentType || "",
                    RecievedAmount: data?.Payment?.RecievedAmount,
                    AmountDescription: data?.Payment?.AmountDescription,
                    Form: false,
                }
            })
    }, [data]);


    return (
        <div
        >
            <Dialog
                className='CusModel'
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
                    Payment Summery
                </DialogTitle>
                <DialogContent
                >
                    <div className='Form-Body'>
                        <div className='h4 text-bold'>
                            Parent Details
                        </div>
                        <Form formik={ParentFormik} Fields={ParentFields} />
                        <div className='h4 text-bold'>
                            Payment Details
                        </div>
                        <Form formik={PaymentFormik} Fields={PaymentFields} />
                        <div className='h4 text-bold' style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            Student Details
                            <span className='block border border-success '></span>
                        </div>
                        <div className='MUI-Table'>
                            <StudentPaymentTable
                                data={data?.Student}
                            // formik={formik} 
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PaymentModel