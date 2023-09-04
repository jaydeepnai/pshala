import React from 'react'
import Form from '../Master/Forms/Form'

function PaymentDetails({ formik, Fields }) {
    const AcademinYear = "2023-2024"
    return (
        <div className='Form-Container'>
            <form onSubmit={formik.handleSubmit} className='Content-form' id="form1">
                <div className='Form-Header' style={{ paddingTop: 0 }}>
                    Payment Details - {AcademinYear}
                </div>
                <div className='Form-Body'>
                    <Form formik={formik} Fields={Fields} />
                </div>
            </form>
        </div>
    )
}

export default PaymentDetails