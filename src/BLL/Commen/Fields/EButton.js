import { Button } from '@mui/material'
import React from 'react'

function EButton({ item, formik }) {
    const OnClick = () => {
        if (!formik.values.Form) {
            formik.isValid = false
        }
    }

    return (
        <Button
            type='Submit'
            onClick={OnClick}
            size={item.size}
            sx={{ m: item.margin, marginLeft: 1, minWidth: item.minWidth }}
            disabled={formik.isSubmitting}
            color="primary" variant="contained">{item.name}</Button>
    )
}

export default EButton