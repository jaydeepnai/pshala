// import { Button } from '@material-ui/core';
import { Button } from '@mui/material';
import React from 'react'

function EReset({ item, formik }) {

    const OnClick = (e) => {
        formik.resetForm();
    }


    return (
        <Button
            type='reset'
            onClick={OnClick}
            size={item.size}
            className='rest-button'
            sx={{ width: 280 }}
            disabled={formik.isSubmitting}
            color="primary" variant="contained">{item.name}</Button>
    )
}

export default EReset