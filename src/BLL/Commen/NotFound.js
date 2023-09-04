import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function NotFound() {

    const navigate = useNavigate()

    useEffect(() => {

        // debugger
        const LocalUser = JSON.parse(localStorage.getItem("Data"));
        const Role = LocalUser?.roleName
        if (Role == "Pathshala Admin" || Role == "System Admin") {
            navigate("/AdminDashboard")
        } else {
            navigate("/ParentDashboard")
        }
    }, [])

    return (
        <div>NotFound</div>
    )
}

export default NotFound