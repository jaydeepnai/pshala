import { MaterialReactTable } from 'material-react-table'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import PaymentDetails from './PaymentDetails'
import PaymentTable from '../../BLL/Payment/PaymentTable'
import { toast } from 'react-toastify'

function PaymentBatch({ columns, ParentData, formik, Fields, OnSubmit, tableData, setTableData, IsPaid, outstandingAmount }) {

    const [ShowStudentTable, setShowStudentTable] = useState(false)
    const AllocatePayments = () => {
        if (formik.values.receivedAmount == "" || formik.values.paymentTypeID == "" || formik.values.paymentDate == '') {
            toast.warning("Please Fill data in Payment details")
            return
        }
        if (outstandingAmount < formik.values.receivedAmount) {
            toast.warning(" You cannot pay more than " + outstandingAmount)
            return
        }
        setShowStudentTable(true);
        const yearlyFees = JSON.parse(localStorage.getItem("Data")).yearlyFees;
        var totalReceived = parseInt(formik.values.receivedAmount);
        if (totalReceived > yearlyFees * tableData.length) {
            toast.error("Total recieved amount is can't be more then " + yearlyFees * tableData.length)
            return
        }
        const PaymentAllocatedStudent = tableData?.map((s, index) => {
            debugger
            if (s.payableFees >= totalReceived && totalReceived !== 0) {
                var AllocationalAmount = totalReceived;
                totalReceived = 0
                return ({
                    ...s,
                    adjustedAmount: AllocationalAmount,
                })
            }
            else if (totalReceived == 0) {
                return ({
                    ...s,
                    adjustedAmount: 0,
                })
            }
            else {
                var AllocationalAmount = s.payableFees;
                totalReceived = totalReceived - s.payableFees
                return ({
                    ...s,
                    adjustedAmount: AllocationalAmount,
                })
            }
        }
        );
        setTableData(PaymentAllocatedStudent);
        toast.success("New Payment Allocated")
    }

    return (
        <>
            <div className='Form-Container'>
                <form className='Content-form' id="form1">
                    <div className='Form-Header'>
                        Parent Details
                    </div>
                    <span class="block border border-success PD"></span>
                    <div className='Form-Body row p-4'>
                        <MaterialReactTable
                            columns={columns}
                            enableColumnResizing
                            columnResizeMode="onChange"
                            data={ParentData}
                            enableColumnOrdering={false}
                            getRowId={(row) => row.id}
                            enableStickyHeader
                            initialState={{ pagination: { pageSize: 5 }, density: 'compact' }}
                            positionGlobalFilter='left'
                            muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                            editingMode="row"
                            positionActionsColumn="last"
                            enableColumnActions={true}
                            enableColumnFilters={true}
                            enablePagination={true}
                            enableSorting={true}
                            enableBottomToolbar={false}
                            enableTopToolbar={false}
                        />
                    </div>
                </form>
            </div>
            <PaymentDetails formik={formik} Fields={Fields} />

            <div className='ActionButtons'>
                <Button
                    type='button'
                    size='large'
                    fullWidth
                    sx={{ m: 1, marginLeft: 1, minWidth: 120, marginBottom: 0 }}
                    form="form1"
                    color="primary" variant="contained"
                    onClick={AllocatePayments}
                > Apply Payment</Button>
            </div>
            {ShowStudentTable || IsPaid ? <div className='MUI-Table'>
                <div className='Form-Header'>
                    Student Details
                </div>
                <span class="block border border-success PD"></span>
                <PaymentTable SubmitFN={OnSubmit} Recieved={formik.values?.receivedAmount} formik={formik} data={tableData} setData={setTableData} />
            </div> : ""}
        </>
    )
}

export default PaymentBatch