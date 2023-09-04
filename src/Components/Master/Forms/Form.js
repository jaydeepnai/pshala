import React from 'react'
import FormField from '../../../BLL/Commen/FormField'
import { ThreeCircles } from 'react-loader-spinner'

function Form({ formik, Fields }) {

    if (Fields == undefined) {
        return <ThreeCircles
            height="100"
            width="100"
            color="#9cdaff"
            wrapperStyle={{
                margin: '26px',
            }}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
        />
    }
    else {
        return <>
            {Fields?.blocks?.map((item) => (
                <div className="row" key={item.name}>
                    <span className='block border border-success'></span>
                    {
                        item?.fld?.map((i) => (
                            <FormField key={i.name} item={i} formik={formik} />
                        ))
                    }
                </div>
            ))}
            {Fields?.ActionButton?.map((item) =>
                item?.btn?.map((i) => (
                    <FormField item={i} key={i.name} formik={formik} />
                )))}

        </>
    }
}

export default Form