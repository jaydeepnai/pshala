import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

function RegisterationList() {

    const data = [
        {
            id: "1",
            FullName: 'Ankit mehta',
            Mobile: '987654321',
            city: 'East Daphne',
            state: 'Kentucky',
            email: 'Ankit@gmail.com',
            Gaurdians: '2',
            Students: '2',
            role: 'parent',
            subRows: [
                {
                    id: "1.0",
                    FullName: 'Gaurdians ',
                    parantID: "1",
                    subRows: [
                        {
                            id: "1.0.0",
                            FullName: 'Sagar mehta',
                            Mobile: '23456786',
                            city: 'South Linda',
                            state: 'West Virginia',
                            email: 'sagar@gmail.com',
                            parantID: "1.0",
                            role: 'gaurdian',

                        },
                        {
                            id: "1.0.1",
                            FullName: 'deep mehta',
                            Mobile: '346563467',
                            city: 'South Linda',
                            state: 'West Virginia',
                            email: 'deep@gmail.com',
                            role: 'gaurdian',
                            parantID: "1.0",
                        },
                    ],
                },
                {
                    FullName: 'Students',
                    id: "1.1",
                    parantID: "1",
                    subRows: [
                        {
                            id: "1.1.0",
                            parantID: "1.1",
                            FullName: 'nirali mehta',
                            Mobile: '5678634479',
                            city: 'South Linda',
                            state: 'West Virginia',
                            email: 'nirali@gmail.com',
                            gender: 'Male',
                            SchoolGrade: '6',
                            role: 'student',
                            Pathshala: '9-5',
                        },
                    ],
                },
            ],
        },
        {
            id: "2",
            FullName: 'krishna jain',
            Mobile: '987654321',
            city: 'Waltham',
            state: 'New york',
            email: 'krishna@gmail.com',
            Gaurdians: '2',
            Students: '2',
            role: 'parent',
            subRows: [
                {
                    id: "2.0",
                    FullName: 'Gaurdians ',
                    parantID: "2",
                    subRows: [
                        {
                            id: "2.0.0",
                            FullName: 'vishnu jain',
                            Mobile: '123456789',
                            city: 'Waltham',
                            state: 'New york',
                            email: 'vishnu@gmail.com',
                            parantID: "2.0",
                            role: 'gaurdian',

                        },
                        {
                            id: "2.0.1",
                            FullName: 'Raam jain',
                            Mobile: '123456789',
                            city: 'Waltham',
                            state: 'New york',
                            email: 'Raam@gmail.com',
                            role: 'gaurdian',
                            parantID: "2.0",
                        },
                    ],
                },
                {
                    FullName: 'Students',
                    id: "2.1",
                    parantID: "1",
                    subRows: [
                        {
                            id: "2.1.0",
                            parantID: "2.1",
                            FullName: 'mohan jain',
                            Mobile: '123456789',
                            city: 'Waltham',
                            state: 'New york',
                            email: 'mohan@gmail.com',
                            gender: 'Male',
                            role: 'student',
                            SchoolGrade: '6',
                            Pathshala: '9-5',
                        },
                    ],
                },
            ],
        },
    ];

    function SubRow({ row, name }) {
        if (row.depth === 1 && name == "FullName" && row.getIsExpanded() == false) {
            return (
                <div style={{ fontWeight: 'bold' }}>{row.original[name]}</div>
            )
        }
        else if (row.depth == 0) {
            return (
                <div>{row.original[name]}</div>
            )
        }
        else if (row.depth === 1 && row.getIsExpanded() != false) {
            if (row.original.FullName == "Students") {
                if (name == "FullName") {
                    return (<div style={{ fontWeight: 'bold' }}>Student Name</div>)
                }
                else if (name == "city") {
                    return (<div style={{ fontWeight: 'bold' }}>Gender</div>)
                } else if (name == "state") {
                    return (<div style={{ fontWeight: 'bold' }}>PS Grades</div>)
                }
                else if (name == "Gaurdians") {
                    return (<div style={{ fontWeight: 'bold' }}>PathShala Class</div>)
                }
            }
            else if (row.original.FullName == "Gaurdians ") {
                if (name == "FullName") {
                    return (<div style={{ fontWeight: 'bold' }}>Gaurdian Name</div>)
                }
            }
        }
        else if (row.depth == 2 && row.original.role == "gaurdian") {
            return (
                <div>{row.original[name]}</div>
            )
        }
        else if (row.depth == 2 && row.original.role == "student") {
            if (name == "FullName") {
                return (<div>{row.original[name]}</div>)
            }
            else if (name == "Mobile") {
                return (<div>{row.original[name]}</div>)
            }
            else if (name == "email") {
                return (<div>{row.original[name]}</div>)
            }
            else if (name == "city") {
                return (<div >{row.original.gender}</div>)
            } else if (name == "state") {
                return (<div >{row.original.SchoolGrade}</div>)
            }
            else if (name == "Gaurdians") {
                return (<div >{row.original.Pathshala}</div>)
            }
        }
    }

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: 'FullName',
                header: 'FullName',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <SubRow row={row} name="FullName" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'Mobile',
                header: 'Mobile',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <SubRow row={row} name="Mobile" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'email',
                header: 'Email',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <SubRow row={row} name="email" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'city',
                header: 'City',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <SubRow row={row} name="city" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'state',
                header: 'State',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <SubRow row={row} name="state" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'Gaurdians',
                header: 'Gaurdians',
                Cell: ({ row }) => {
                    return (
                        <div>
                            <SubRow row={row} name="Gaurdians" />
                        </div>
                    );
                },
            },
            {
                accessorKey: 'Students',
                header: 'Students',
            },
        ],
        [],
        //end
    );

    return (
        <>
            <div className='Page-Header'>
                Registeration List
            </div>
            <div className='MUI-Table Table_width'>
                <MaterialReactTable
                    columns={columns}
                    data={data}
                    enableGlobalFilter={true}
                    positionGlobalFilter='left'
                    enableExpanding
                    muiTableBodyRowProps={(row) => {
                        if (row.row.depth == 2 && row.row.original.role == "gaurdian") {
                            return { style: { backgroundColor: 'rgb(191 255 211)' } };
                        }
                        else if (row.row.depth == 2) {
                            return { style: { backgroundColor: 'rgb(215 250 245)' } };
                        }
                    }}
                    enableExpandAll 
                />
            </div>
        </>
    )
}

export default RegisterationList