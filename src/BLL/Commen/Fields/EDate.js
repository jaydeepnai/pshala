import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';

function EDate({ item, formik }) {
    function convertDateFormat(inputDate) {
        debugger
        const [month, day, year] = inputDate.split('-')?.map(part => parseInt(part, 10));
        const convertedDate = `${month?.toString().padStart(2, '0')}-${day?.toString().padStart(2, '0')}-${year}`;
        return convertedDate;
    }

    const [Date, setDate] = useState("08-31-2023")
    // {
    //     convertDateFormat("08-31-2023")
    // })

    // useEffect(() => {
    //     convertDateFormat("08-31-2023")
    // }, [formik?.values[item?.name]])


    // console.log(convertedDate)
    // console.log(Date)

    return (
        <div className={item.GridName}>
            <TextField key={item.name}
                // placeholder="Select date"
                //  type="text"
                // id="example" //class="form-control"
                sx={{ m: 1, minWidth: item.width }}
                fullWidth
                // value={convertedDate}
                value={formik?.values[item?.name]}
                onChange={formik.handleChange}
                type="date"
                // InputProps={{
                //     endAdornment: null,
                // }}
                placeholder={item.name}
                label={item.name}
                name={item.name}
                InputLabelProps={{
                    shrink: true,
                }}
                onBlur={formik.handleBlur}
                error={formik.errors[item.name] && formik.touched[item.name]}
                helperText={formik.errors[item.name] && formik.touched[item.name] ? (
                    <div className="input-feedback">{formik.errors[item.name]}</div>
                ) : item.helperText}
            />
        </div>

    )
}

export default EDate