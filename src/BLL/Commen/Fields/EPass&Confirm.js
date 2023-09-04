import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import { useEffect, useState } from 'react'

function EPassAndConfirm({ item, formik }) {
    const [showPassword, setShowPassword] = useState(true)
    const [showCPassword, setShowCPassword] = useState(false)
    const [ConfirmPassword, setConfirmPassword] = useState(null)
    useEffect(() => {
        setShowPassword(!showPassword)
    }, [item.show])
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const CheckConfirmPassword = (value) => {
        if (value != formik.values[item.name]) {
            setConfirmPassword(true)
        } else {
            setConfirmPassword(false)
        }
        formik.setFieldValue("ConfirmPassword", value);
    }

    return (
        <>
            <div className={item.GridName + " PassPad"}>
                <TextField
                    sx={{ m: 2, minWidth: item.width }}
                    id={item.name}
                    autoComplete={item.name}
                    name={item.name}
                    label={item.label}
                    variant="outlined"
                    key={item.name}
                    margin="normal"
                    fullWidth
                    placeholder={item.name}
                    value={formik.values[item.name]}
                    onChange={formik.handleChange}
                    type={showPassword ? "text" : "password"}
                    onBlur={formik.handleBlur}
                    error={formik.errors[item.name] && formik.touched[item.name]}
                    helperText={formik.errors[item.name] && formik.touched[item.name] && (
                        <div className="input-feedback">{formik.errors[item.name]}</div>
                    )}
                    tabIndex={1}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                <IconButton tabIndex={-1}
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </div>
            <div className={item.GridName + " PassPad"}>
                <TextField
                    sx={{ m: 2, minWidth: item.width }}
                    id="outlined-helperText"
                    label="Confirm Password*"
                    type={showCPassword ? "text" : "password"}
                    fullWidth
                    onBlur={(e) => { CheckConfirmPassword(e.target.value) }}
                    helperText={ConfirmPassword == null ? "" : "Password Should be Matched "}
                    error={ConfirmPassword == null ? false : ConfirmPassword}
                    tabIndex={2}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    tabIndex={-1}
                                    onClick={() => { setShowCPassword(!showCPassword); }}
                                >
                                    {showCPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

            </div >
        </>
    )
}

export default EPassAndConfirm