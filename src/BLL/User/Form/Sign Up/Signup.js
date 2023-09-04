import React from 'react'
import { DefaultValue, Fields, LoginSchema, OnSubmit } from './FormOptions';
import { useFormik } from 'formik';
import Signup from '../../../../Components/User/Signup';

function SignupBLL() {
    const formik = useFormik({
        initialValues: DefaultValue,
        onSubmit: OnSubmit,
        validationSchema: LoginSchema
    });

    return (
        <>
            <Signup formik={formik} Fields={Fields} />
        </>
    )
}

export default SignupBLL