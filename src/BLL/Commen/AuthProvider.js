import React from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function AuthProvider({ children }) {

    const navigate = useNavigate()

    useEffect(() => {
        const LocalUser = JSON.parse(localStorage.getItem("Data"));
        if (!LocalUser) {
            navigate("/login");
        }
    }, [])


    //   return (
    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider