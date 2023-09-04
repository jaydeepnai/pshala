import React, { useEffect, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Button, IconButton, TextField, } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { MobileToggle } from '../../features/User/UserSlice';


const StudentPaymentTable = ({ SubmitFN, Recieved, data }) => {
    const [tableData, setTableData] = useState(() => data);
    const [rowSelection, setRowSelection] = useState({});
    const IsMobile = useSelector(MobileToggle)


    const TotalFees = () => {
        return tableData.reduce((acc, row) => acc + parseFloat(row.fees), 0);
    }

    const TotalCurrent = () => {
        return tableData.reduce((acc, row) => acc + parseFloat(row.current), 0);
    }


    const columns = [
        {
            accessorKey: 'fullname',
            header: 'Full Name',
            size: 30,
            Cell: ({ cell, row }) => (
                <div className='MobileTitle' data-th="FullName : ">
                    {row.original.fullname}
                </div>
            ),

        },
        {
            accessorKey: 'grade',
            header: 'Pathshala Grade',
            size: 30,
            Cell: ({ cell, row }) => (
                "a"
            ),

        },
        {
            accessorKey: 'class',
            header: 'Class',
            size: 30,
            Cell: ({ cell, row }) => (
                <div className='MobileTitle class' style={{
                    width: "-webkit-fill-available",
                    display: "flex",
                }} data-th="Class : ">
                    {!IsMobile ?
                        <TextField className='number'
                            style={{
                                marginTop: "15px",
                                marginBottom: "2px",
                                marginLeft: "4px"
                            }}
                            inputProps={{
                                step: 'any' // Allow decimal numbers
                            }}
                            id="outlined-basic"
                            label="Class"
                            size='small'
                            // error={Invalid}
                            variant="outlined"
                            value={row.original.class}
                            readonly
                            disabled
                        >
                        </TextField> :
                        <div >
                            {row.original.class}
                        </div>}
                </div>
            ),

        },
        {
            accessorKey: 'fees',
            header: 'Fees',
            size: 30,
            Cell: ({ cell, row }) => (
                <div className='MobileTitle' data-th="Fees Amount: " style={{ paddingBottom: 0 }}>

                    {row.original.fees}
                </div>
            ),
            Footer: () => <div className='mt-2'>Fees: {TotalFees()}</div>,
        },
        {
            accessorKey: 'current',
            header: 'Current Amount',
            size: 30,
            Cell: ({ cell, row }) => {
                const [Invalid, setValid] = useState(false);
                return (
                    <div className='MobileTitle CurrentAMT ' style={{
                        width: "150px",
                        display: "flex",
                    }}>

                        <TextField className='number' inputProps={{
                            step: 'any' // Allow decimal numbers
                        }} id="outlined-basic"
                            label="Current"
                            size='small'
                            error={Invalid}
                            style={{
                                marginTop: "15px",
                                marginBottom: "2px",
                                marginLeft: "4px"
                            }}
                            variant="outlined"
                            value={row.original.current}
                            onChange={(e) => {
                                tableData[row.index]["current"] = e.target.value == '' ? parseInt(0) : e.target.value;
                                setTableData([...tableData]);
                            }}
                            onBlur={(e) => {
                                if (row.original.current > row.original.fees) {
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
            Footer: () => <div className='mt-2'>Current : {TotalCurrent()}</div>,
        },
    ]

    return (
        <>
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
                enableBottomToolbar={false}
                enableTopToolbar={false}
            />

            <div className='ActionButtons'>
                <Button
                    type='submit'
                    size='large'
                    fullWidth
                    sx={{ m: 3, marginLeft: 1, minWidth: 60 }}
                    form="form1"
                    // onClick={SaveBatch}
                    color="primary" variant="contained">Save</Button>
            </div>
        </>
    );
};

export default StudentPaymentTable;