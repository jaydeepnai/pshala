import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect, useState } from "react";
import { FormHelperText } from '@mui/material';

function DropDownList({ item, formik }) {
    // console.log(item)
    const [Data, SetData] = useState([])
    // console.log()

    // console.log(formik.values)
    // console.log(formik?.values[item?.name])
    useEffect(() => {
        if (item.elm) {
            SetData(item.elm);
        }
    }, [])
    if (item.name === "stateID") {
        console.log(item.elm)
    }

    return (
        <>
            <div className={item.GridName}>
                <FormControl sx={{ m: 1, minWidth: item.width }} fullWidth>
                    {/* <InputLabel id="demo-simple-select-helper-label">{item.label}</InputLabel> */}
                    <select class="form-select"
                        key={item.name}
                        labelId="demo-simple-select-helper-label"
                        id={item.name}
                        value={formik.values[item?.name]}
                        label={item.label}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name={item.name}
                        error={formik.errors[item.name] && formik.touched[item.name]}
                    >
                        <option value="">
                            <em>None</em>
                        </option>
                        {Data?.map((elm) => (
                            <option key={elm.name} value={elm.value}>
                                {elm.name}
                            </option>
                        ))}
                    </select>
                    <FormHelperText error={formik.errors[item.name] && formik.touched[item.name]}>{formik.errors[item.name] && formik.touched[item.name] ?
                        (
                            <div className="input-feedback">{formik.errors[item.name]}</div>
                        ) : item.helperText}</FormHelperText>
                </FormControl>
            </div>
        </>
    );
}

export default DropDownList;