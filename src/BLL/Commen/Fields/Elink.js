// import { Button } from '@material-ui/core';
import React from 'react'

function ELink({ item, formik }) {

    const OnClick = (e) => {
        formik.resetForm();
    }

    return (
        // <div >
        <a className='h5 text-primary Elink' href={item.href}
            color="primary" variant="contained">{item.name}</a>
        // </div>
    )
}

export default ELink