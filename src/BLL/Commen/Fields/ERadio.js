import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

function ERadio({ item, formik }) {
    return (
        <div className={item.GridName}>
            <FormControl className="ml-3">
                <FormLabel id="demo-radio-buttons-group-label">{item.label}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    sx={{ m: 10 }}
                    row
                    key={item.name}
                    defaultValue={formik.values[item.name]}
                    name={item.name}
                    onBlur={formik.handleBlur}
                >
                    {item?.elm?.map((elm) => (
                        <>
                            <FormControlLabel
                                key={elm.name}
                                value={elm.name}
                                onChange={formik.handleChange}
                                label={elm.label}
                                control={<Radio />}
                            />
                        </>
                    ))}
                </RadioGroup>
            </FormControl>
            {formik.errors[item.name] && formik.touched[item.name] && (
                <div className="input-feedback">{formik.errors[item.name]}</div>
            )}
        </div>
    );
}

export default ERadio;