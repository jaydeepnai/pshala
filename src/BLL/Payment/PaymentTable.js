import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { MobileToggle } from '../../features/User/UserSlice';
import { useNavigate } from 'react-router-dom';


const PaymentTable = ({ SubmitFN, Recieved, formik, data, setData }) => {
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate()

    const TotalFees = () => {
        return tableData.reduce((acc, row) => row.payableFees == null ? 0 : acc + parseFloat(row.payableFees), 0);
    }

    const TotalCurrent = () => {
        return tableData.reduce((acc, row) => row.adjustedAmount == null ? 0 : acc + parseFloat(row.adjustedAmount), 0);
    }

    const columns = [
        {
            accessorKey: 'fullName',
            header: 'Full Name',
            size: 60,
            Cell: ({ row }) => (
                <div className='MobileTitle' data-th="FullName : ">
                    {row.original.fullName}
                </div>
            ),

        },
        {
            accessorKey: 'grade',
            header: 'Pathshala Grade',
            size: 30,
            Cell: ({ row }) => (
                <div className='MobileTitle' data-th="Grade : ">
                    {row.original.grade}
                </div>
            ),
        },
        {
            accessorKey: 'class',
            header: 'Class',
            size: 30,
            Cell: ({ row }) => (
                <div className='MobileTitle' data-th="Grade : ">
                    {row.original.class}
                </div>
            ),

        },
        {
            accessorKey: 'payableFees',
            header: 'Fees',
            size: 20,
            Cell: ({ row }) => (
                <div className='MobileTitle' data-th="Fees Amount: " style={{ paddingBottom: 0 }}>
                    {row.original.payableFees == null || row.original.payableFees == 0 ? 0 : row.original.payableFees}
                </div>
            ),
            Footer: () => <div className='mt-2'>Fees: {TotalFees()}</div>,
        },
        {
            accessorKey: 'adjustedAmount',
            header: 'Adjusted Amount',
            size: 40,
            Cell: ({ cell, row }) => {
                const [Invalid, setValid] = useState(false);
                return (
                    <div className='MobileTitle CurrentAMT ' style={{
                        width: "150px",
                        display: "flex",
                    }}>

                        <TextField className='number' inputProps={{
                            step: 'any'
                        }} id="outlined-basic"
                            label="Adjusted Amount"
                            size='small'
                            error={Invalid}
                            style={{
                                marginTop: "15px",
                                marginBottom: "2px",
                                marginLeft: "4px"
                            }}
                            variant="outlined"
                            value={row.original.adjustedAmount === null ? "0" : row.original.adjustedAmount}
                            onChange={(e) => {
                                tableData[row.index]["adjustedAmount"] = e.target.value == '' ? parseInt(0) : e.target.value;
                                setTableData([...tableData]);
                            }}
                            onBlur={(e) => {
                                if (row.original.adjustedAmount > row.original.payableFees) {
                                    toast.warning("Recieved Amount Can't be more than Class fees")
                                    setValid(true)
                                }
                                else {
                                    setValid(false)
                                }
                            }}
                        >
                        </TextField>
                    </div>
                )
            },
            Footer: () => <div className='mt-2'>Adjusted : {TotalCurrent()}</div>,
        },
        {
            accessorKey: 'due',
            header: 'Dues',
            size: 20,
            Cell: ({ row }) => (
                <div className='MobileTitle' data-th="Fees Amount: " style={{ paddingBottom: 0 }}>
                    {row.original.payableFees - row.original.adjustedAmount}
                </div>
            ),
        },
    ]

    const SaveBatch = (e) => {
        e.preventDefault();
        debugger
        if (Object.keys(tableData).length != 0) {
            const YearlyFees = JSON.parse(localStorage.getItem("Data")).yearlyFees;
            if (Recieved > YearlyFees * tableData.length) {
                toast.error("Total recieved amount is can't be more then " + YearlyFees * tableData.length)
                return
            }
            var ExtraAmount = false
            tableData?.map((t) => {
                if (t.payableFees < t.adjustedAmount) {
                    ExtraAmount = true
                }
            })
            if (ExtraAmount) {
                toast.warning("You can't pay extra amount for Student")
                return
            }
            function calculateArraySum() {
                let sum = 0;
                for (let i = 0; i < tableData.length; i++) {
                    sum += parseInt(tableData[i].adjustedAmount);
                }
                return sum;
            }
            var current = calculateArraySum()
            // )
            if (current != Recieved) {
                toast.warning("Adjusted Amount & Recieved Amount should be equal")
                formik.values.Form = true
                return
            } else {
                formik.values.Form = false
                setData(tableData)
                SubmitFN()
            }
        }
        else {
            toast.error("You can't post if you don't have any students");
        }

    }

    useEffect(() => {
        TotalCurrent()
        TotalFees()
    }, [tableData])

    useEffect(() => {
        setTableData(data)
    }, [data])


    return (
        <>
            <div className='col-12 AC justify-content-start col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12'
                style={{ width: '-webkit-fill-available' }}
            >
            </div>
            <MaterialReactTable
                className="CardTable"
                columns={columns}
                enableColumnResizing
                columnResizeMode="onChange"
                data={tableData}
                enableColumnOrdering={false}
                getRowId={(row) => row.id}
                enableStickyHeader
                initialState={{ pagination: { pageSize: 5 }, density: 'compact' }}
                positionGlobalFilter='left'
                muiTableContainerProps={{ sx: { maxHeight: '600px' } }}
                editingMode="row"
                positionActionsColumn="last"
                displayColumnDefOptions={{
                    'mrt-row-actions': {
                        muiTableHeadCellProps: {
                            align: "left",
                        },
                        size: 50,
                    },
                    'mrt-row-numbers': {
                        muiTableHeadCellProps: {
                            align: "right",
                        },
                        size: 80,
                    }
                }}
                muiSearchTextFieldProps={{
                    placeholder: 'Search all users',
                    sx: { minWidth: '300px' },
                    variant: 'outlined',
                }}
                enableColumnActions={true}
                enableColumnFilters={true}
                enablePagination={true}
                enableSorting={true}
                enableBottomToolbar={true}
                enableTopToolbar={true}
            />

            <div className='ActionButtons d-flex'>
                <Button
                    type='submit'
                    size='large'
                    fullWidth
                    sx={{ m: 3, marginLeft: 1, minWidth: 60 }}
                    form="form1"
                    onClick={SaveBatch}
                    color="primary" variant="contained">Save</Button>
                <Button
                    size='large'
                    fullWidth
                    sx={{ m: 3, marginLeft: 1, minWidth: 60 }}
                    form="form1"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/PaymentList")
                    }}
                    color="primary" variant="contained">Back</Button>
            </div>
        </>
    );
};

export default PaymentTable;
