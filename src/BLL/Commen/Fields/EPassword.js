import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function EPassword({ item, formik }) {
    const [showPassword, setShowPassword] = useState(false)
    useEffect(() => {
        setShowPassword(!showPassword)
    }, [item.show])
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div className={item.GridName}>
            <TextField
                sx={{ m: 2, minWidth: 280 }}
                id={item.name}
                name={item.name}
                label={item.name}
                variant="outlined"
                key={item.name}
                margin="normal"
                placeholder={item.name}
                value={formik.values[item.name]}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                onBlur={formik.handleBlur}
                error={formik.errors[item.name] && formik.touched[item.name]}
                helperText={formik.errors[item.name] && formik.touched[item.name] ? (
                    <div className="input-feedback">{formik.errors[item.name]}</div>
                ) : item.helperText}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        // </InputAdornment>
                    )
                }}
            />
        </div >
    )
}

export default EPassword