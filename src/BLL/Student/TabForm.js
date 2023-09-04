import React from 'react'
import FormField from '../Commen/FormField';
import { ThreeCircles } from 'react-loader-spinner';

function TabForm({ formik, Fields }) {

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
                    <span className='block'></span>
                    {
                        item?.fld?.map((i) => (
                            <FormField item={i} formik={formik} />
                        ))
                    }
                </div>
            ))}
        </>
    }
}

export default TabForm