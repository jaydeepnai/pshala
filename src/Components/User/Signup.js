import React from 'react'
import Form from '../Master/Forms/Form'

function Signup({ formik, Fields }) {
    return (
        <div className='Form-Container form-bg'>
            <div className='text-center mt-4 h3 WhiteSmokeText'>
                <img src={process.env.PUBLIC_URL + '/assets/images/logo.png'} alt="Logo"
                    style={{ width: "10%", marginRight: "10px" }}
                />
                PathShala Sign-up
            </div>
            <form onSubmit={formik.handleSubmit} width="700" className='form'>
                <div className='Form-Header'>
                    Sign-up Details
                </div>
                <div className='Form-Body'>
                    <Form formik={formik} Fields={Fields} />
                </div>
            </form>
        </div>
    )
}

export default Signup